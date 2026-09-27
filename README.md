# Lead Management API

A REST API for creating and listing leads. It is built with Express, TypeScript, Prisma ORM, and PostgreSQL.

## Stack

- Node.js
- Express 5
- TypeScript
- Prisma ORM
- PostgreSQL
- pnpm

## Prerequisites

Install the following before starting:

- [Node.js](https://nodejs.org/) 22 or later
- [pnpm](https://pnpm.io/) 11.13.1 or later
- PostgreSQL 14 or later, running locally or accessible through a connection URL

## Run locally

Follow these steps from a terminal.

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/driyant/lead-management-server.git
   cd lead-management-server
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create your local environment file:

   ```bash
   cp .env.example .env
   ```

4. Create a PostgreSQL database:

   ```bash
   psql -U postgres -c "CREATE DATABASE lead_management_db;"
   ```

   If you use another PostgreSQL user, password, host, port, database name, or a hosted database, adjust the connection string in `.env` accordingly:

   ```dotenv
   PORT=3001
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/lead_management_db?schema=public"
   ```

5. Generate the Prisma client and apply the database migrations:

   ```bash
   pnpm prisma generate
   pnpm prisma migrate dev
   ```

6. Optionally insert the included sample leads:

   ```bash
   pnpm prisma db seed
   ```

7. Start the development server:

   ```bash
   pnpm dev
   ```

   The API is available at `http://localhost:3001` by default. To use another port, change `PORT` in `.env`.

## Verify the API

Check that the server is running:

```bash
curl http://localhost:3001/
```

Expected response:

```json
{ "status": "OK" }
```

List all leads:

```bash
curl http://localhost:3001/api/leads
```

Create a lead:

```bash
curl -X POST http://localhost:3001/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "status": "NEW"
  }'
```

Expected response:

```json
{ "Message": "Lead created successfully" }
```

### Lead fields

| Field | Required | Description |
| --- | --- | --- |
| `name` | Yes | Lead's name. |
| `email` | Yes | Unique email address. |
| `status` | No | One of `NEW`, `ENGAGED`, `PROPOSAL_SENT`, `CLOSED_WON`, or `CLOSED_LOST`. Defaults to `NEW`. |

The API assigns `id` and `createdAt` automatically. Creating a lead with an email address that already exists returns an error.

## Available commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Run the API in development mode with file watching. |
| `pnpm build` | Compile TypeScript into `dist/`. |
| `pnpm start` | Run the compiled application. Run `pnpm build` first. |
| `pnpm test` | Run the Jest test suite. |
| `pnpm lint` | Check the code with ESLint. |
| `pnpm prisma generate` | Generate the Prisma client. |
| `pnpm prisma migrate dev` | Create and apply migrations during local development. |
| `pnpm prisma db seed` | Insert the included sample leads. |
| `pnpm prisma studio` | Open Prisma Studio to inspect and edit database records. |

## Production

Set `DATABASE_URL` and, optionally, `PORT` in the production environment. Then install dependencies, generate the Prisma client, apply committed migrations, build, and start the service:

```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate deploy
pnpm build
pnpm start
```

The production startup file is `dist/index.js`. For Passenger-based hosting, configure it as the application startup file after building the project.

## CI/CD deployment

Every push to `main` runs tests, generates the Prisma client, builds the application, and uploads the repository to cPanel using FTP. Configure these GitHub Actions secrets:

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`

The workflow excludes `node_modules` and `.env` files. Install the production dependencies on the server and configure its `DATABASE_URL` and `PORT` before starting `dist/index.js`.
