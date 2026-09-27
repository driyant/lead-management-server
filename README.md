# Lead Manager API

A simple, fast, and scalable RESTful API for managing leads. This backend is built as a microservice using Express.js and TypeScript, utilizing Prisma ORM for type-safe database interactions with PostgreSQL.

## Technologies Used

- **Node.js & Express.js:** Fast, unopinionated web framework for building the API.
- **TypeScript:** Strict syntactical superset of JavaScript for safer and more predictable code.
- **Prisma ORM:** Next-generation Node.js and TypeScript ORM for seamless PostgreSQL integration.
- **PostgreSQL:** Robust, open-source relational database.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (Package manager)
- A running instance of PostgreSQL (Local or Cloud like Neon/Supabase)

## Production

Set `DATABASE_URL` and `PORT` in the production environment, then generate the
Prisma client, apply pending migrations, and build the application:

```bash
pnpm prisma generate
pnpm prisma migrate deploy
pnpm run build
pnpm start
```

For a Passenger deployment, use `dist/index.js` as the startup file after
running `pnpm run build`.
