import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

interface Produto {
  id: number;
  name: string;
  descricao: string;
  preco: number;
}

function Card() {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [page, setPage] = useState(1);

  const fetchProdutos = () => {
    axios
      .get(`http://localhost:3000/produtos?page=${page}&limit=10`)
      .then((response) => {
        console.log("Dados recebidos da API:", response.data);
        setProdutos(response.data.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  };

  useEffect(() => {
    fetchProdutos();
  }, [page]);

  return (
    <div>
      <Header />
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button onClick={fetchProdutos}>🔄 Atualizar Produtos</button>
      </div>

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

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          ⬅ Página anterior
        </button>

        <span className="span-paginacao" style={{ margin: "0 15px" }}>
          Página {page}
        </span>

        <button onClick={() => setPage((prev) => prev + 1)}>
          Próxima página ➡
        </button>
      </div>
    </div>
  );
}

export default Card;
