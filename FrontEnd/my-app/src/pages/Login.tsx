import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <h1>Login</h1>
      <div className="div-email">
        <label htmlFor="username">Email:</label>
        <input type="email" placeholder="Digite seu email" />
        <br></br>

        <div className="div-password">
          <label htmlFor="password">Senha:</label>
          <input type="password" placeholder="Digite sua senha" />
        </div>
      </div>
      <div className="buttons">
        <div className="link-home">
          <Link id="link-button" to="/">
            Ir para o Home
          </Link>
        </div>
        <div className="button-login">
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
