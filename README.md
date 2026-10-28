# VERITAS Bureau of Investigation (fictional demo site)

React 18+/Vite/Tailwind front end. Optional Supabase back end. All content is fictional.

## Run locally
```
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```
Without Supabase keys the Report and Contact forms save to your browser only (demo mode).

## Turn on the back end (free)
1. Create a project at supabase.com.
2. SQL Editor: paste and run `supabase/schema.sql`.
3. Project Settings > API: copy the Project URL and the `anon` public key.
4. Copy `.env.example` to `.env` and fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
Free projects pause after 7 days of inactivity; click "Restore" in the dashboard to wake them.

## Deploy on Vercel (free)
1. Push this folder to a GitHub repository.
2. vercel.com > Add New > Project > import the repo. Framework: Vite (auto-detected).
3. Add the two environment variables above (Settings > Environment Variables), then Deploy.
`vercel.json` already rewrites all routes to `index.html` so page refreshes work.

## Placeholders for the next phases
Departments, Services, Investigations, Careers and the legal pages show a "Coming soon" screen.

## Staff sign-in (`/admin`)
Invite only, with Supabase Auth and an authenticator-app code (TOTP) on every sign-in.
1. Supabase > Authentication > Sign In / Providers: turn **off** "Allow new users to sign up".
2. Authentication > URL Configuration: set Site URL to your site, and add `https://<your-site>/admin` and `http://localhost:5173/admin` to Redirect URLs.
3. Authentication > Users > Invite user. The person opens the email, chooses a password, then scans a QR code.
4. Add them to the staff list in the SQL Editor:
   `insert into public.staff (user_id) select id from auth.users where email = 'person@example.org';`

## Security roadmap
- Admin dashboard reading `reports`/`messages` via an RLS policy for staff only.
- Rate limiting and CAPTCHA (e.g. Cloudflare Turnstile) on the public forms.
- Security headers (CSP, HSTS) in `vercel.json`.
- Never put the `service_role` key in the front end.
