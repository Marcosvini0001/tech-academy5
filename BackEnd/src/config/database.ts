import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE || "ecommerce", // <-- Corrija aqui!
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "sua_senha",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: Number(process.env.DB_PORT) || 3306,
  }
);

export default sequelize;
