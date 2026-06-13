# Backend Logic Document
**Version:** 1.0  
**Last Updated:** 2026-06-09

---

## 1. Squad Creation — `POST /squad`

Một user action duy nhất nhưng chạm 2 bảng.

**Bước thực hiện:**
1. Validate 11 player_ids — đúng số lượng, không trùng
2. Validate formation — đếm GK/DEF/MID/FWD, phải khớp 4-3-3 hoặc 4-4-2
3. Validate team limit — không quá 3 cầu thủ từ cùng một team_id
4. Validate budget — SUM(base_price) của 11 cầu thủ ≤ 100
5. Validate unique squad — UNIQUE(user_id, matchday) không được trùng
6. INSERT vào `squad` — lấy squad_id trả về
7. INSERT 11 rows vào `squadplayer` — mỗi row gồm squad_id + player_id

**Rollback:** Nếu bất kỳ bước nào fail, không INSERT gì cả. Dùng transaction.

---

## 2. Transfer Execution — `POST /transfers`

Một user action duy nhất nhưng chạm 3 bảng. Đây là entry point duy nhất cho toàn bộ transfer logic.

**Bước thực hiện:**
1. Validate transfer window — trận đầu tiên của matchday chưa bắt đầu (GR-07)
2. Validate transfer count — COUNT(transfers WHERE user_id + matchday) < 5 (GR-05)
3. Validate player_out — player_out_id phải tồn tại trong squadplayer của squad hiện tại
4. Validate budget — budget_used - player_out.base_price + player_in.base_price ≤ 100
5. Validate squad rules sau transfer — formation và team limit vẫn hợp lệ sau khi swap
6. DELETE row trong `squadplayer` WHERE squad_id + player_out_id
7. INSERT row mới vào `squadplayer` — squad_id + player_in_id
8. UPDATE `squad` SET budget_used = budget_used - player_out.base_price + player_in.base_price
9. INSERT vào `transfers` — user_id, player_in_id, player_out_id, matchday

**Rollback:** Nếu bất kỳ bước nào fail, rollback toàn bộ. Dùng transaction.

---

## 3. Score Calculation — triggered by `POST /playerstats`

**Bước thực hiện:**
1. Nhận raw stats: goals, assists, minutes_played, yellow_cards, position
2. Tính score theo bảng điểm v1 (xem API.md section 8)
3. INSERT vào `playerstat` với score đã tính
4. Score được lưu vào DB — không tính lại mỗi lần đọc (GR-08)

**Scoring formula (v1):**
```
score = 0
if position in ('FWD', 'MID'):
    score += goals * 5
if position in ('DEF', 'GK'):
    score += goals * 6
score += assists * 3
if minutes_played >= 60:
    score += 2
else:
    score += 1
score -= yellow_cards * 1
# red cards: -3 (deferred — not in stats schema v1)
# clean sheet: +4 for DEF/GK (deferred — requires match result data)
```

**Swap to v2:** Thay thế scoring function trong `core/scoring.py` — không ảnh hưởng endpoint hoặc DB schema (GR-09, FR-17).

---

## 4. Squad Score Retrieval — `GET /score`

Score không được lưu ở cấp squad. Được tính on-the-fly bằng JOIN.

**Query logic (single matchday):**
```sql
SELECT SUM(ps.score)
FROM playerstat ps
JOIN squadplayer sp ON ps.player_id = sp.player_id
JOIN squad s ON sp.squad_id = s.squad_id
WHERE s.matchday = {matchday}
AND ps.match_id IN (SELECT match_id FROM match WHERE matchday = {matchday})
```

**Query logic (cumulative):**
- Chạy query trên cho mỗi matchday đã có squad + stats
- SUM tất cả lại

---

## 5. Budget Tracking

- Budget khởi đầu: $100M (GR-01)
- `squad.budget_used` lưu tổng giá của 11 cầu thủ hiện tại
- `budget_remaining` = 100 - budget_used — derived, không lưu trong DB, tính khi trả response
- Giá cầu thủ không thay đổi trong v1 — sell price = buy price (GR-06)

---

## 6. Transfer Window Lock — GR-07

- Transfer bị khóa khi trận đầu tiên của matchday bắt đầu
- Implementation: so sánh thời gian hiện tại với MIN(date) của các match WHERE matchday = {matchday}
- Nếu `datetime.now() >= first_match.date` → trả về 400

---

## 7. Formation Validation

Formations hợp lệ: 4-3-3 hoặc 4-4-2 (GR-03)

| Formation | GK | DEF | MID | FWD |
|---|---|---|---|---|
| 4-3-3 | 1 | 4 | 3 | 3 |
| 4-4-2 | 1 | 4 | 4 | 2 |

**Logic:** Đếm số lượng từng position trong danh sách player_ids. So sánh với hai pattern trên. Nếu không khớp → 400.