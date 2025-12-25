# Senz Connect

Senz Connect is a monorepo MVP for connecting buyers and farmers with CCR review and admin management.

## Tech Stack
- **Mobile:** Expo + React Native + TypeScript
- **Admin Web:** Vite + React + TypeScript
- **Backend:** Node.js + Express + TypeScript + Mongoose
- **Auth:** Firebase Authentication (email/password)
- **Database:** MongoDB Atlas

## Monorepo Structure
```
/apps
  /mobile
  /admin-web
  /server
/packages
  /shared
/docs
```

## Setup
1. Install dependencies from the repo root:
   ```bash
   npm install
   ```
2. Create `.env` files for each app from the examples:
   - `apps/server/.env.example`
   - `apps/admin-web/.env.example`
   - `apps/mobile/.env.example`
3. Configure Firebase:
   - Create a Firebase project with email/password auth enabled.
   - Create a Firebase service account JSON and copy the values into `apps/server/.env`.

## Development
Run everything together:
```bash
npm run dev
```

Or run individually:
```bash
npm run dev:server
npm run dev:admin
npm run dev:mobile
```

## Seed Admin & CCR
```bash
npm run seed
```

## Docs
- `docs/api.md`
- `docs/roles.md`
- `docs/matching.md`

## Notes
- Never commit secrets. `.env` files are ignored and only `.env.example` is committed.
