import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import api from "../services/api";
import "../styles/Registro.css";

const Registro = () => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !cpf ||
      !endereco ||
      !cep
    ) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Formato de e-mail inválido.");
      return;
    }

    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      setError("CPF inválido. Deve conter 11 dígitos.");
      return;
    }

    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
        cpf,
        endereco,
        cep,
      });

      if (response.status === 201) {
        alert("Usuário registrado com sucesso!");
        navigate("/login");
      }
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Erro ao registrar usuário.");
      }
    }
  };

  return (
    <div className="registro">
      <div className="h2-registro">
        <h2>Crie sua conta</h2>
        <p className="registro-subtitle">
          Preencha os campos abaixo para se cadastrar
        </p>
      </div>
      {error && <div className="registro-error">{error}</div>}
      <form className="formulario-registro" onSubmit={handleSubmit}>
        <div className="registro-row">
  <div className="registro-field">
    <label className="label-registro" htmlFor="nome">Nome</label>
    <input
      className="registro-input"
      type="text"
      id="nome"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
      placeholder="Seu nome completo"
      autoComplete="name"
    />
  </div>
  <div className="registro-field">
    <label className="label-registro" htmlFor="cpf">CPF</label>
    <input
      className="registro-input"
      type="text"
      id="cpf"
      value={cpf}
      onChange={(e) => setCpf(e.target.value)}
      required
      placeholder="Apenas números"
      autoComplete="off"
      maxLength={11}
    />
  </div>
</div>
<div className="registro-row">
  <div className="registro-field">
    <label className="label-registro" htmlFor="email">E-mail</label>
    <input
      className="registro-input"
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      placeholder="seu@email.com"
      autoComplete="email"
    />
  </div>
  <div className="registro-field">
    <label className="label-registro" htmlFor="endereco">Endereço</label>
    <input
      className="registro-input"
      type="text"
      id="endereco"
      value={endereco}
      onChange={(e) => setEndereco(e.target.value)}
      required
      placeholder="Rua, número, bairro"
      autoComplete="street-address"
    />
  </div>
</div>
<div className="registro-row">
  <div className="registro-field">
    <label className="label-registro" htmlFor="cep">CEP</label>
    <input
      className="registro-input"
      type="text"
      id="cep"
      value={cep}
      onChange={(e) => setCep(e.target.value)}
      required
      placeholder="Somente números"
      autoComplete="postal-code"
      maxLength={8}
    />
  </div>
</div>
<div className="registro-row">
  <div className="registro-field">
    <label className="label-registro" htmlFor="senha">Senha</label>
    <input
      className="registro-input"
      type="password"
      id="senha"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      placeholder="Crie uma senha"
      autoComplete="new-password"
    />
  </div>
  <div className="registro-field">
    <label className="label-registro" htmlFor="confirmar-senha">Confirmar Senha</label>
    <input
      className="registro-input"
      type="password"
      id="confirmar-senha"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
      placeholder="Repita a senha"
      autoComplete="new-password"
    />
  </div>
</div>
        <div className="div-register-button">
          <Link id="link-register" to="/">
            Voltar
          </Link>
          <button type="submit">Registrar</button>
        </div>
      </form>
    </div>
  );
};

export default Registro;
