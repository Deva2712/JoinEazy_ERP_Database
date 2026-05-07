# Joineazy ERP — Database

Manages all PostgreSQL schema migrations and seed data using Sequelize CLI.

## Setup

```bash
cd database
npm install
cp .env.example .env   # fill in your RDS credentials
```

## Commands

| Command | What it does |
|---------|-------------|
| `npm run migrate` | Run all pending migrations |
| `npm run migrate:undo` | Undo the last migration |
| `npm run migrate:undo:all` | Undo all migrations (wipe schema) |
| `npm run seed` | Run all seeders |
| `npm run seed:undo` | Undo all seeders |

## Structure

```
database/
├── config/
│   └── database.js        ← DB connection config (dev / test / prod)
├── migrations/            ← One file per table, run in order
├── seeders/               ← Initial/demo data
├── connection.js          ← Shared Sequelize instance (imported by backend)
├── .sequelizerc           ← Tells sequelize-cli where to find files
└── .env.example
```

## Migration naming convention

```
YYYYMMDD-NNN-create-<table>.js
```
