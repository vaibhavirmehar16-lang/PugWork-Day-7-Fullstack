# PugWork — Day 6 + Day 7 Workspace

This workspace preserves the Day 6 employee dashboard and adds a Day 7 full-stack implementation.

- **Day 6 original frontend:** `PugArch-Day-6-Employee-Hub/`
- **Day 7 full-stack assignment:** `day-07/`
- **Day 7 instructions:** [`day-07/README.md`](day-07/README.md)

## Start Day 7 locally

Use two terminal windows.

**Terminal 1 — Express API**
```bash
cd day-07/node-api
copy .env.example .env
npm install
npm run dev
```

**Terminal 2 — Next.js frontend**
```bash
cd day-07/nextjs-app
copy .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000/employees`.

Demo credentials: `admin@pugwork.local` / `PugWork@123`.

Read [`day-07/README.md`](day-07/README.md) for architecture, routes, data model, environment variables, API examples, and extension ideas.

> This is a learning starter. The Day 7 JSON file store and demo credentials are not suitable for production HR data.
