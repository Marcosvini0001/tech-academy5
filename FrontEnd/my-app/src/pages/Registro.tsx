import { Link } from "react-router-dom";

const Registro = () => {
  return (
    <div className="registro">
      <h1>Cadastre-se</h1>
      <div className="div-dados">
        <label htmlFor="username">Seu nome:</label>
        <input type="name" placeholder="Digite seu nome" />
        <br />
        <label htmlFor="username">Seu CPF:</label>
        <input type="email" placeholder="Digite seu CPF" />
        <br />
        <label htmlFor="username">Email:</label>
        <input type="email" placeholder="Digite seu email" />
        <br />
        <label htmlFor="username">Endereço:</label>
        <input type="text" placeholder="Digite seu endereço" />
        <br />
        <label htmlFor="username">CEP:</label>
        <input type="text" placeholder="Digite seu CEP" />
        <br />
        <label htmlFor="password">Senha:</label>
        <input type="password" placeholder="Digite sua senha" />
      </div>
      <div className="buttons">
        <div className="link-home">
          <Link id="link-button" to="/">
            Ir para o Home
          </Link>
        </div>
        <div className="registrar">
          <button>Registrar</button>
        </div>
      </div>
    </div>
  );
};

export default Registro;
