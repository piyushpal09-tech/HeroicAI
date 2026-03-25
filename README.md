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
   - Server: `MONGO_URI`, `REDIS_URL`, `POSTGRES_URL`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `ANTHROPIC_API_KEY`, `EMAILJS_SERVICE_ID`
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

## Live URLs

- Frontend: set your deployed Vercel URL here
- Backend: set your deployed Railway URL here
