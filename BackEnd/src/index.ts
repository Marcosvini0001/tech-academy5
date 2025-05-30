import express from "express";
import cors from "cors";
import sequelize from "./config/database";

import usersRoutes from "./routes/usersRoutes";
import admRoutes from "./routes/admRoutes";
import produtoRoutes from "./routes/produtoRoutes";
import pagamentoRoutes from "./routes/pagamentoRoutes";
import formaPagamentoRoutes from "./routes/formaPagamentoRoutes";
import loginRoutes from "./routes/loginRoutes";
import itemPedidoRoutes from "./routes/itemPRoutes";
import categoriaRoutes from "./routes/categoriaRoutes";
import precoRoutes from "../src/routes/precoRoutes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World! :)");
});

app.use("/users", usersRoutes);
app.use("/admin", admRoutes);
app.use("/produtos", produtoRoutes);
app.use("/pagamentos", pagamentoRoutes);
app.use("/forma-pagamento", formaPagamentoRoutes);
app.use("/login", loginRoutes);
app.use("/item-pedido", itemPedidoRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/precos", precoRoutes);

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });

app.listen(port, () => {
  console.log("Server is running on port", port);
});

export default app;
