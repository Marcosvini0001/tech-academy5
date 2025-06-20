import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import api from "../services/api";
import { isAxiosError } from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      await api.post("/login", { email, password });
      alert(`Login successful! Welcome, ${email}`);
      navigate("/");
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setError(error.response?.data?.error || "Error during login.");
      } else {
        setError("Unknown error during login.");
      }
    }
  };

  return (
    <div className="login">
      <div className="h2-login">
        <h2>LOGIN</h2>
      </div>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="div-inputs">
          <label>Email:</label>
          <input
            className="input-login-email"
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="div-inputs">
          <label>Senha:</label>
          <input
            className="input-login-senha"
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="div-button-login">
          {" "}
          <Link className="link-login" to="/">
            Voltar
          </Link>
          <Link className="link-login" to="/registro">
            Criar conta
          </Link>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
