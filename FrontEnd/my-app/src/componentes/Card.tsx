import { useState, useEffect } from "react";
import axios from "axios";

function Card() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/produtos")
      .then((response) => {
        console.log("Dados recebidos da API:", response.data);
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  return (
    <div className="lista-cards">
      {produtos.map((produto) => (
        <div className="produto" key={produto.id}>
          <img src="src/img/user.png" alt={produto.name} />
          <h3>{produto.name}</h3>
          <p>{produto.descricao}</p>
          <p>
            <strong>Preço:</strong> R$ {produto.preco}
          </p>
          <div className="button-card">
            <button className="button-carrinho">Adicionar ao carrinho</button>
            <button className="button-comprar">Comprar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
