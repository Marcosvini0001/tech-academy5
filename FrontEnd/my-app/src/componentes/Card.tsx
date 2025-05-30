import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

interface Produto {
  id: number;
  name: string;
  descricao: string;
  categoria: {
    nome: string;
  };
  preco: {
    valor: number;
  };
}

interface Avaliacao {
  id: number;
  id_usuario: number;
  id_produto: number;
  nota: number;
  comentario: string;
}

function Card() {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [page, setPage] = useState(1);

  const [avaliacoes, setAvaliacoes] = useState<{ [produtoId: number]: Avaliacao[] }>({});
  const [nota, setNota] = useState<{ [produtoId: number]: number }>({});
  const [comentario, setComentario] = useState<{ [produtoId: number]: string }>({});

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchProdutos = () => {
    axios
      .get(`http://localhost:3000/produtos?page=${page}&limit=10`)
      .then((response) => {
        setProdutos(response.data.data); 
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  };

  const fetchAvaliacoes = async (produtoId: number) => {
    try {
      const res = await axios.get(`http://localhost:3000/avaliacoes/${produtoId}`);
      setAvaliacoes((prev) => ({ ...prev, [produtoId]: res.data }));
    } catch (err) {
      setAvaliacoes((prev) => ({ ...prev, [produtoId]: [] }));
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, [page]);

  useEffect(() => {
    produtos.forEach((produto) => {
      fetchAvaliacoes(produto.id);
    });
  }, [produtos]);

  const handleAvaliar = async (produtoId: number) => {
    try {
      await axios.post("http://localhost:3000/avaliacoes", {
        id_produto: produtoId,
        nota: nota[produtoId] || 5,
        comentario: comentario[produtoId] || "",
        userId: user.id,
      });
      setComentario((prev) => ({ ...prev, [produtoId]: "" }));
      setNota((prev) => ({ ...prev, [produtoId]: 5 }));
      fetchAvaliacoes(produtoId);
      alert("Avaliação enviada!");
    } catch (err: any) {
      alert(err.response?.data?.error || "Erro ao enviar avaliação");
    }
  };

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
              <strong>Categoria:</strong> {produto.categoria?.nome || "N/A"}
            </p>
            <p>
              <strong>Preço:</strong> R$ {produto.preco?.valor?.toFixed(2) || "0.00"}
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
