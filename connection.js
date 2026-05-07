import { Sequelize } from "sequelize";
import "dotenv/config";

/**
 * Shared Sequelize instance — imported by the backend and all models.
 * Reads connection settings from environment variables.
 */
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false, // set to console.log to see raw SQL in dev
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: process.env.DB_SSL === "true"
        ? { require: true, rejectUnauthorized: false }
        : false,
    },
  }
);

export const connectDB = async () => {
  await sequelize.authenticate();
  console.log("✅ PostgreSQL connected");
};

export default sequelize;
