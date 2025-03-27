import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:3000/login", {
        email,
        password,
      });

      const userData = response.data;
      setUser(userData); 
      localStorage.setItem("user", JSON.stringify(userData));
      alert(`Login realizado com sucesso! Bem-vindo, ${userData.name}`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Erro ao fazer login");
      } else {
        setError("Erro desconhecido ao fazer login");
      }
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      {user && (
        <div className="user-info">
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="div-dados" onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Digite seu email"
        />
        <br />
        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Digite sua senha"
        />
        <br />
        <div className="buttons">
          <div className="link-registro">
            <Link id="link-button" to="/registro">
              Criar conta
            </Link>
          </div>
          <div className="entrar">
            <button type="submit">Entrar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
