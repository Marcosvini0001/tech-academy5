import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import api from "../services/api";
import { isAxiosError } from "axios";
import "../styles/Registro.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Formato de e-mail inválido.");
      return;
    }

    try {
      const response = await api.post("/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token); 
      localStorage.setItem("user", JSON.stringify(user)); 

      alert(`Login realizado com sucesso! Bem-vindo, ${email}`);
      navigate("/");
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setError(error.response?.data?.error || "Erro ao fazer login.");
      } else {
        setError("Erro desconhecido ao fazer login.");
      }
    }
  };

  return (
    <div className="registro">
      <div className="h2-registro">
        <h2>LOGIN</h2>
      </div>
      {error && <div className="registro-error">{error}</div>}
      <form className="formulario-registro" onSubmit={handleLogin}>
        <div className="registro-row">
          <div className="registro-field">
            <label className="label-login" htmlFor="login-email">E-mail</label>
            <input
              className="registro-input"
              type="email"
              id="login-email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
        </div>
        <div className="registro-row">
          <div className="registro-field">
            <label className="label-login" htmlFor="login-senha">Senha</label>
            <input
              className="registro-input"
              type="password"
              id="login-senha"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
        </div>
        <div className="div-register-button">
          <Link id="link-register" to="/">
            Voltar
          </Link>
          <Link id="link-register" to="/registro">
            Criar conta
          </Link>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

