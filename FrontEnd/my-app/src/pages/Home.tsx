import { useNavigate } from "react-router-dom";
import "../styles/Styles.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <div className="titulo-principal">
          <h1>GYM POISON</h1>
        </div>
        <div className="div-usuario">
          <div className="div-login">
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
          <div className="div-registro">
            <button onClick={() => navigate("/registro")}>Registre-se</button>
          </div>
        </div>
      </header>

      <div className="div-header">
        <a href="">Produtos</a>
        <a href="">Home</a>
        <a href="">Suporte</a>
      </div>

      <div>
        <div className="div-nav">
          <input
            type="search"
            id="search"
            name="name"
            placeholder="Procure seu produto"
          />
          <button>Search</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
