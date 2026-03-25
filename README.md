# HeroicAI

HeroicAI is a premium full-stack AI SaaS platform built with a Vite React client and an Express API. It includes a premium landing experience, authentication, a multi-tool AI workspace, pricing and contact flows, session caching, usage limiting, and deployment scaffolding for Vercel and Railway.

## Stack

- Frontend: React, Vite, Tailwind CSS, React Router v6, Framer Motion, tsParticles, EmailJS, Axios
- Backend: Node.js, Express, Mongoose, JWT, bcrypt, Redis, PostgreSQL, Anthropic SDK
- Deployment: Vercel, Railway, GitHub Actions

## Project Structure

```text
client/
  src/
    animations/
    components/
    context/
    data/
    hooks/
    layouts/
    pages/
    utils/
server/
  config/
  middleware/
  models/
  routes/
  utils/
```

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   npm --prefix client install
   npm --prefix server install
   ```
2. Copy environment templates:
   - `client/.env.example` to `client/.env`
   - `server/.env.example` to `server/.env`
3. Fill the required values:
   - Server: `PORT`, `NODE_ENV`, `CLIENT_URL`, `ADDITIONAL_ALLOWED_ORIGINS`, `MONGO_URI`, `REDIS_URL`, `POSTGRES_URL`, `POSTGRES_SSL`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `ANTHROPIC_API_KEY`, `EMAILJS_SERVICE_ID`
   - Client: `VITE_API_URL`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
4. Run the apps:
   ```bash
   npm run dev:client
   npm run dev:server
   ```

## Build Commands

- Client build: `npm run build:client`
- Server verification: `npm run build:server`
- Root build: `npm run build`

## AI Tools Included

- Code Reviewer
- Resume Optimizer
- API Docs Generator
- DB Schema Designer
- Proposal Writer
- Content Planner
- Support Bot Builder
- Startup Idea Validator

## Deployment Notes

- `client/vercel.json` configures SPA fallback for Vercel.
- `server/railway.toml` configures Railway deployment.
- `.github/workflows/deploy.yml` builds the client and verifies the server on pushes to `main`, then deploys when the necessary secrets are configured.
- `npm run deploy:check` reports which provider and runtime variables are still missing before deployment.

## Deployment Checklist

1. Create a Vercel project pointing at the `client` directory.
2. Create a Railway service pointing at the `server` directory.
3. Set production environment variables in Vercel and Railway.
4. Update `CLIENT_URL` in Railway to your deployed Vercel domain.
5. Update `VITE_API_URL` in Vercel to your deployed Railway API URL.
6. Add GitHub Action secrets for Vercel and Railway if you want push-to-deploy automation.

## Live URLs

- Frontend: https://heroicai-web.vercel.app
- Backend: https://api-production-dc20.up.railway.app

## Current Production Notes

- The live frontend is connected to the live Railway API.
- CORS is configured for `https://heroicai-web.vercel.app`.
- MongoDB, Redis, and PostgreSQL are configured in Railway and the production API health check reports them as active.
- Production auth now runs against MongoDB-backed users with Redis-backed session caching.
- Anthropic, Google OAuth, and EmailJS provider secrets are still not configured, so AI responses remain in mock mode and the OAuth/contact integrations are not fully activated yet.
