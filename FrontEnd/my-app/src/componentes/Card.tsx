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
          console.log("Produtos carregados:", response.data.data); // Verifique se os produtos aparecem aqui
          setProdutos(response.data.data || []); // Garante que será um array
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
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <div className="produto" key={produto.id}>
                <img src="img/user.png" alt={produto.name} />
                <h3>{produto.name}</h3>
                <p>{produto.descricao}</p>
                <p>
                  <strong>Preço:</strong> R$ {produto.preco?.valor ? Number(produto.preco.valor).toFixed(2) : "0.00"}
                </p>
                <div className="button-card">
                  <button className="button-carrinho">Adicionar ao carrinho</button>
                  <button
                    className="button-comprar"
                    onClick={() => {
                      // Criar uma versão totalmente nova do produto com apenas os dados necessários
                      const produtoLimpo = {
                        id: produto.id,
                        name: produto.name,
                        descricao: produto.descricao,
                        // Extrair apenas o valor numérico do preço
                        preco: {
                          valor: produto.preco ? Number(produto.preco.valor) : 0
                        }
                      };
                      
                      console.log("Produto limpo sendo passado:", produtoLimpo);
                      navigate("/formapagamento", { state: { produto: produtoLimpo } });
                    }}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#666" }}>Nenhum produto encontrado.</p>
          )}
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
