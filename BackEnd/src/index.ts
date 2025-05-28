import express from "express";
import sequelize from "./config/database";
import usersRoutes from "./routes/usersRoutes";
import admRoutes from "./routes/admRoutes";
import produtoRoutes from "./routes/produtoRoutes";
import pagamentoRoutes from "../src/routes/pagamentoRoutes";
import formaPagamento from "./routes/formaPagamentoRoutes";
import loginRoutes from "./routes/loginRoutes"; 
import userRoutes from "./routes/usersRoutes"; 
import formaPagamentoRoutes from "./routes/formaPagamentoRoutes";
import itemPedidoRoutes from './routes/itemPRoutes';
import avaliacaoRoutes from "./routes/avaliacaoRoutes";
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
app.use(loginRoutes); 
app.use("/users", userRoutes); 
app.use(formaPagamentoRoutes);
app.use('/itemPedido', itemPedidoRoutes); 
app.use(avaliacaoRoutes);
sequelize
  .sync({ alter: true }) 
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });
sequelize
  .sync({ alter: true }) 
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });

app.listen(port, () => {
  console.log("Server is running on port ", port);
});

export default app;