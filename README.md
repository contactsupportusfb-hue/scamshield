# VERITAS Bureau of Investigation (fictional demo site)

React 18+/Vite/Tailwind front end. Optional Supabase back end. All content is fictional.

## Run locally
```
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```
Without Supabase keys the Report and Contact forms save to your browser only (demo mode).

## Turn on the back end (free)
1. Create a project at supabase.com.
2. SQL Editor: paste and run `supabase/schema.sql`.
3. Project Settings > API: copy the Project URL and the `anon` public key.
4. Copy `frontend/.env.example` to `frontend/.env` and fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
Free projects pause after 7 days of inactivity; click "Restore" in the dashboard to wake them.

## Deploy on Vercel (free)
1. Push this folder to a GitHub repository.
2. vercel.com > Add New > Project > import the repo. Set Root Directory to `frontend`. Framework: Vite (auto-detected).
3. Add the two environment variables above (Settings > Environment Variables), then Deploy.
`frontend/vercel.json` already rewrites all routes to `index.html` so page refreshes work.

## Placeholders for the next phases
Departments, Services, Investigations, Careers, Admin and the legal pages show a "Coming soon" screen.

## Security roadmap
- Staff sign-in with Supabase Auth + MFA (TOTP); admin dashboard reading `reports`/`messages` via an RLS policy for staff only.
- Rate limiting and CAPTCHA (e.g. Cloudflare Turnstile) on the public forms.
- Security headers (CSP, HSTS) in `vercel.json`.
- Never put the `service_role` key in the front end.
