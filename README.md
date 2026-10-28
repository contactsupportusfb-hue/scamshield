# ScamShield

An independent, static guide that helps people recognise scams, know what to do if they've been scammed, and report them to the real authorities.

**ScamShield is not a government agency or law enforcement, and is not affiliated with any.** It collects no personal data: there is no sign-in and no report form. It simply explains the warning signs and links out to the official reporting channels (FTC, FBI IC3, Action Fraud, and others).

## Tech

React + Vite + Tailwind. No backend, no database, no environment variables.

## Run locally

```
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Edit the content

- `frontend/src/data/content.js` — the recovery steps, warning signs, scam types and official reporting links.
- `frontend/src/data/site.js` — the name, tagline and the contact email shown on the About page. Change `hello@scamshield.example` to your own before sharing.

When you change a reporting link, confirm it against the official site first — accuracy matters here.

## Deploy on Vercel (free)

1. Push this folder to a GitHub repository.
2. vercel.com → Add New → Project → import the repo. Set **Root Directory** to `frontend`. Framework: Vite (auto-detected).
3. Deploy. `frontend/vercel.json` already rewrites all routes to `index.html` so page refreshes work.

No environment variables are needed.
