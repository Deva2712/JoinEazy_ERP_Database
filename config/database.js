import "dotenv/config";

/**
 * Sequelize CLI config — used by sequelize-cli for migrations and seeders.
 * Uses the same DATABASE_* variable names as the backend.
 */
const config = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5432,
    dialect: process.env.DATABASE_DIALECT || "postgres",
    dialectOptions: {
      ssl: false,
    },
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5432,
    dialect: process.env.DATABASE_DIALECT || "postgres",
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5432,
    dialect: process.env.DATABASE_DIALECT || "postgres",
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  },
};

export default config;
