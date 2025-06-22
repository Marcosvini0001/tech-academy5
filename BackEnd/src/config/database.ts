import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

const sequelize = new Sequelize(
  process.env.DB_NAME || "ecommerce",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "sua_senha",
  {
    host: process.env.DB_HOST || "db",
    dialect: "mysql",
    logging: false,
  }
);

const connectWithRetry = async () => {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await sequelize.authenticate();
      console.log("Database connection established successfully.");
      return;
    } catch (error) {
      retries++;
      console.log(
        `Database connection attempt ${retries} failed. Retrying in ${
          RETRY_DELAY / 1000
        } seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }

  console.error("Maximum retry attempts reached. Could not connect to database.");
};

// Call the function but don't block initialization
connectWithRetry();

export default sequelize;
