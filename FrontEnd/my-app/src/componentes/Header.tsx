import "../styles/Header.css";

function Header() {
  return (
    <div>
      <header>
        <div className="titulo-principal">
          <h1>GYM POISON</h1>
        </div>
        <div className="div-usuario">
          <div className="div-login">
            <button>Login</button>
          </div>
          <div className="div-registro">
            <button>Registre-se</button>
          </div>
        </div>
      </header>
      <div className="div-header">
        <a href="">Produtos</a>
        <a href="">Home</a>
        <a href="">Suporte</a>
      </div>
    </div>
  );
}

export default Header;
