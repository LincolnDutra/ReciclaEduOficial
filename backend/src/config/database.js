import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Prefer DATABASE_URL if provided (useful in Docker compose), otherwise build DSN for mysql
const connectionString = process.env.DATABASE_URL ||
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT || 3306}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(connectionString, {
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    // Ajuste se necessário, e.g. timezone
  }
});

export default sequelize;
