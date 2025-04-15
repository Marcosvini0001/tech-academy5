import Header from "../componentes/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Produto {
  id: number;
  name: string;
  descricao: string;
  preco: number;
}

const Home = () => {
  const navigate = useNavigate();
  const [ofertas, setOfertas] = useState<Produto[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/produtos?page=1&limit=4")
      .then((response) => {
        setOfertas(response.data.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar ofertas:", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="div-conteudo-home">
        <button className="btn-produtos" onClick={() => navigate("/produtos")}>
          Compre agora!
        </button>
      </div>

      <div className="div-oferta">
        <div className="h3-oferta">
          <h3>Oferta da semana</h3>
        </div>
        <div className="oferta-cards">
          {ofertas.map((produto) => (
            <div className="card-produto" key={produto.id}>
              <img src="src/img/user.png" alt={produto.name} />
              <h4>{produto.name}</h4>
              <p>{produto.descricao}</p>
              <p><strong>R$ {produto.preco}</strong></p>
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
