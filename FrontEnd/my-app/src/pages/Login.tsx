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

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      console.log("Response Data:", response.data);
      const userData = response.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      alert(`Login realizado com sucesso! Bem-vindo, ${userData.name}`);
    } catch (error: unknown) {
      console.error("Error:", error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Erro ao fazer login");
      } else {
        setError("Erro desconhecido ao fazer login");
      }
    }
  };

  return (
    <div className="login">
      <div className="h2-login">
        <h2>LOGIN</h2>
      </div>
      {user && (
        <div className="user-info">
          <p>
            <strong>Nome:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
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
