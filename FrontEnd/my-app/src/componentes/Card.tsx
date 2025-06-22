import { useState, useEffect } from "react";
  import api from "../services/api"; 
  import { useNavigate } from "react-router-dom";
  import Header from "./Header";

  interface Produto {
    id: number;
    name: string;
    descricao: string;
    preco: {
      valor: number;
    };
  }

  function Card() {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [page, setPage] = useState(1);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const fetchProdutos = () => {
      api
        .get(`/produtos?page=${page}&limit=10`) 
        .then((response) => {
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
              <img src="/assets/img/user.png" alt={produto.name} />

              <h3>{produto.name}</h3>
              <p>{produto.descricao}</p>
              <p>
                <strong>Preço:</strong> R$ {produto.preco?.valor ? produto.preco.valor.toFixed(2) : "0.00"}
              </p>

              <div className="button-card">
                <button className="button-carrinho">Adicionar ao carrinho</button>
                <button
                  className="button-comprar"
                  onClick={() => navigate("/formapagamento", { state: { produto } })}
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
