import { Sequelize } from "sequelize";
import "dotenv/config";

/**
 * Shared Sequelize instance — imported by the backend and all models.
 * Uses the same DATABASE_* variable names as the backend .env
 */
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5432,
    dialect: process.env.DATABASE_DIALECT || "postgres",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: process.env.NODE_ENV === "production"
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
