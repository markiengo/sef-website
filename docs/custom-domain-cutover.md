# Custom Domain Cutover — Deferred Follow-Up (PLT-03 / D-08)

> **STATUS: NOT EXECUTED THIS PHASE.**
> DNS/registrar access was not confirmed during Phase 1 (decision D-08).
> These steps are documented here so the cutover can be performed once access is available.
> This is a PLT-03 follow-up — not new scope for Phase 1.

---

## When to run this

Run these steps only after you have confirmed login access to the domain registrar where the
existing SEF custom domain is registered. You will need permission to add or modify DNS records.

---

## Step-by-step cutover

### 1. Add the domain in Vercel Project Settings

1. Open your Vercel project dashboard at vercel.com.
2. Go to **Settings → Domains**.
3. Click **Add Domain** and enter your custom domain (e.g. `saigonequitiesforum.com` or
   the relevant subdomain such as `www.saigonequitiesforum.com`).
4. Vercel will display the DNS records it requires (either an A record or a CNAME record,
   depending on whether you are adding an apex domain or a subdomain).

### 2. Add the DNS records at your registrar

Vercel will provide one of two record types:

| Domain type | Record type | Name | Value |
|-------------|-------------|------|-------|
| Apex (`example.com`) | A | `@` | Vercel's IP (shown in dashboard, e.g. `76.76.21.21`) |
| Subdomain (`www.example.com`) | CNAME | `www` | `cname.vercel-dns.com` |

Add the record exactly as shown in the Vercel Domains panel. Propagation typically takes
a few minutes to a few hours depending on the registrar's TTL settings.

### 3. HTTPS is automatic

Vercel automatically provisions a TLS certificate (via Let's Encrypt) for any domain added
to a project once DNS propagation is confirmed. No manual certificate steps are required.

### 4. Update `site:` in `astro.config.mjs` and redeploy

After the domain is live and HTTPS is active, update the `site:` value in `astro.config.mjs`:

```js
// Before (vercel.app subdomain)
site: 'https://sef-website-chi.vercel.app',

// After (custom domain)
site: 'https://your-custom-domain.com',
```

Commit and push to `master` — Vercel will auto-build and the sitemap will emit absolute URLs
using the custom domain.

---

*Deferred per D-08. Phase 1 done-state: HTTPS on `https://sef-website-chi.vercel.app/`.*
