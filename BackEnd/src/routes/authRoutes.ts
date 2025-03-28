import express from "express";
import sequelize from "../config/database";
import usersRoutes from "../routes/usersRoutes";
import admRoutes from "../routes/admRoutes";
import produtoRoutes from "../routes/produtoRoutes";
import pagamentoRoutes from "./pagamentoRoutes";
import formaPagamento from "./formaPagamento"; 
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World! :)");
});

app.use(usersRoutes);
app.use(admRoutes);
app.use(produtoRoutes);
app.use(pagamentoRoutes);
app.use(formaPagamento);
app.use("/login"); 
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("database foi sincronizado com sucesso");
  })
  .catch((error: unknown) => {
    console.log("deu zica no bagulho", error);
  });

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
