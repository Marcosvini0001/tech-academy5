import express from "express";
import sequelize from "./config/database";
import usersRoutes from "./routes/usersRoutes";
import admRoutes from "./routes/admRoutes";
import produtoRoutes from "./routes/produtoRoutes";
import pagamentoRoutes from "../src/routes/pagamentoRoutes";
import formaPagamento from "../src/routes/formaPagamento";
import loginRoutes from "./routes/loginRoutes"; // Import the login route
import userRoutes from "./routes/usersRoutes"; // Import the user route
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World! :)");
});

app.use(express.json());
app.use(usersRoutes);
app.use(admRoutes);
app.use(produtoRoutes);
app.use(pagamentoRoutes);
app.use(formaPagamento);
app.use(loginRoutes); // Register the login route
app.use("/users", userRoutes); // Register the user route

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("database foi sincronizado com sucesso");
  })
  .catch((error) => {
    console.log("deu zica no bagulho", error);
  });

app.listen(port, () => {
  console.log("Server is running on port ", port);
});

export default app;