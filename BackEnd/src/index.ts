import express from "express";
import sequelize from "./config/database";
import usersRoutes from "./routes/usersRoutes";
import admRoutes from "./routes/admRoutes";
import produtoRoutes from "./routes/produtoRoutes";
import pagamentoRoutes from "../src/routes/pagamentoRoutes";
import formaPagamento from "../src/routes/formaPagamento";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World! :)");
});

app.use(express.json());
app.use(usersRoutes);
app.use(admRoutes);
app.use(produtoRoutes);
app.use(pagamentoRoutes);
app.use(formaPagamento);

// sync database
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
