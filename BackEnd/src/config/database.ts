import { Sequelize } from "sequelize";
import express from "express";

const app = express();
app.use(express.json());

const sequelize = new Sequelize("ecommerce", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
