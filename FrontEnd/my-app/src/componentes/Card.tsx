import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Card() {
  const navigate = useNavigate();
  interface Produto {
    id: number;
    name: string;
    descricao: string;
    preco: number;
  }

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/produtos?page=${page}&limit=10`)
      .then((response) => {
        console.log("Dados recebidos da API:", response.data);
        setProdutos(response.data.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, [page]);

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
            <button
              className="button-comprar"
              onClick={() =>
                navigate("/formapagamento", { state: { produto } })
              }
            >
              Comprar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
