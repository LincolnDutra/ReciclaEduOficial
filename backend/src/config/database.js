import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres", // Mudado para Postgres
  logging: false,
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false } // Obrigatório para o Neon
  }
});

export default sequelize;
