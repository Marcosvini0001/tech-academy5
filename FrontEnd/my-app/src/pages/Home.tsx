import Header from "../componentes/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

interface Produto {
  id: number;
  name: string;
  descricao: string;
  preco: number;
}

const categorias = [
  { nome: "Proteínas", icone: "🥛" },
  { nome: "Pré-treino", icone: "⚡" },
  { nome: "Vitaminas", icone: "💊" },
  { nome: "Aminoácidos", icone: "🧬" },
  { nome: "Emagrecedores", icone: "🔥" },
  { nome: "Acessórios", icone: "🏋️" },
];

const promocoes = [
  { titulo: "Frete Grátis", descricao: "Para compras acima de R$ 199 em todo Brasil!" },
  { titulo: "Combo Fitness", descricao: "Leve 3, pague 2 em produtos selecionados." },
  { titulo: "Descontos Progressivos", descricao: "Quanto mais você compra, maior o desconto!" },
];

const Home = () => {
  const navigate = useNavigate();
  const [ofertas, setOfertas] = useState<Produto[]>([]);

  useEffect(() => {
    api
      .get("/produtos?page=1&limit=4")
      .then((response) => {
        setOfertas(response.data.produtos || []);
      })
      .catch((error) => {
        console.error("Erro ao buscar ofertas:", error);
      });
  }, []);

  return (
    <div>
      <Header />

      <section className="home-destaques">
        <div className="home-destaque-categorias">
          <h2>Categorias em destaque</h2>
          <div className="home-categorias-lista">
            {categorias.map((cat) => (
              <button
                key={cat.nome}
                className="home-categoria-btn"
                onClick={() => navigate(`/produtos?categoria=${cat.nome.toLowerCase()}`)}
              >
                <span className="home-categoria-icone">{cat.icone}</span>
                <span>{cat.nome}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="home-destaque-promocoes">
          <h2>Promoções Especiais</h2>
          <ul className="home-promocoes-lista">
            {promocoes.map((promo) => (
              <li key={promo.titulo}>
                <strong>{promo.titulo}:</strong> {promo.descricao}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-chamada">
        <h1>Suplementos para sua evolução!</h1>
        <p>
          Os melhores produtos para performance, saúde e bem-estar. 
          Encontre proteínas, pré-treinos, vitaminas e muito mais para potencializar seus resultados na academia.
        </p>
        <button className="btn-produtos" onClick={() => navigate("/produtos")}>
          Ver todos os produtos
        </button>
      </section>

      <div className="div-oferta">
        <div className="h3-oferta">
          <h3>Ofertas da Semana</h3>
        </div>
        <div className="oferta-cards">
          {ofertas.map((produto) => (
            <div className="card-produto" key={produto.id}>
              <img src="/img/produto-default.png" alt={produto.name} />
              <h4>{produto.name}</h4>
              <p>{produto.descricao}</p>
              <p>
                <strong>R$ {produto.preco.toFixed(2)}</strong>
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
      </div>
    </div>
  );
};

export default Home;
