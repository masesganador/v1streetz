# V1 Streets

Promotional and player-registration website for the V1 Streets 1 vs 1 football competition. Built with Next.js, TypeScript and a Neon-compatible PostgreSQL database for deployment on Vercel.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Create a PostgreSQL database, run `database/schema.sql`, then set `DATABASE_URL` in `.env.local`.

## Deploy to Vercel

1. Import this repository into Vercel.
2. Create or connect a Neon PostgreSQL database.
3. Run `database/schema.sql` against the database.
4. Add `DATABASE_URL` to the Vercel project environment variables.
5. Deploy.

Registration submissions are stored in the `registrations` table. The public page deliberately labels date, venue, fee, prize and final rules as pending until the organiser confirms them.
