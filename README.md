# Funreal by Lotf — Memorial Sanctuary & Funeral Services

A modern, dignified, and serene web application for **Funreal by Lotf** built with **Next.js 16 (App Router)** and **Supabase (PostgreSQL & Auth)**.

---

## 🏛️ Features Included

1. **Next.js 16 App Router Architecture**:
   - Modern TypeScript support
   - Server & Client Component separation
   - Dynamic routing and API Route Handlers

2. **Supabase Integration**:
   - `@supabase/ssr` & `@supabase/supabase-js` configured
   - Client Component client: `src/lib/supabase/client.ts`
   - Server Component / Route Handler client: `src/lib/supabase/server.ts`
   - Session refresh middleware: `src/middleware.ts` & `src/lib/supabase/middleware.ts`
   - TypeScript Database schema types: `src/lib/supabase/types.ts`
   - Ready-to-run database migration script: `supabase/schema.sql`

3. **Core Sanctuary Pages**:
   - **Home (`/`)**: Hero, quick registry search, emergency 24/7 hotline, featured memorials with interactive candle vigils, and sanctuary packages.
   - **Memorial Registry (`/memorials`)**: Digital memorial search & directory with live Supabase query support and fallback demo data.
   - **Create Memorial (`/memorials/create`)**: Form to publish new memorials directly into Supabase.
   - **Funeral Services (`/services`)**: Traditional vigil, cremation care, and advance pre-planning arrangements with confidential inquiry form.
   - **Family Portal (`/login`)**: Secure Supabase Auth with Email and Password / Magic Link.

---

## 🚀 Quickstart Guide

### 1. Run the Development Server
From the `funreal-by-lotf` folder:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Connect Your Supabase Project
1. Create a project at [supabase.com](https://supabase.com).
2. Go to **Project Settings** -> **API** and copy:
   - Project URL
   - `anon` `public` API key
3. Update `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
   ```
4. Open your Supabase **SQL Editor** and run the contents of [`supabase/schema.sql`](./supabase/schema.sql) to generate all tables, Row Level Security (RLS) policies, and demo seed data.

---

## 📂 Project Structure

```
funreal-by-lotf/
├── .env.local             # Local environment secrets
├── .env.local.example     # Environment template
├── supabase/
│   └── schema.sql         # Supabase PostgreSQL schema & seed records
├── src/
│   ├── app/
│   │   ├── api/memorials/ # Server-side Route Handler
│   │   ├── layout.tsx     # Root layout with Navbar & Footer
│   │   ├── page.tsx       # Homepage
│   │   ├── globals.css    # Rich vanilla CSS design system
│   │   ├── memorials/     # Memorial registry & creation
│   │   ├── services/      # Funeral packages & pre-planning
│   │   └── login/         # Family portal auth
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MemorialCard.tsx
│   │   └── SupabaseStatus.tsx
│   └── lib/
│       └── supabase/
│           ├── client.ts   # Browser client
│           ├── server.ts   # Server client
│           ├── middleware.ts # Session refresh
│           └── types.ts    # TypeScript database definitions
```
