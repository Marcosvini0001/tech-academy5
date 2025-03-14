import { Sequelize } from "sequelize";

const sequelize = new Sequelize("ecommerce", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
