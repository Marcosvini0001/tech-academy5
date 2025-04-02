import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

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

    // Validação básica no frontend
    if (!name || !email || !password || !confirmPassword || !cpf || !endereco || !cep) {
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
      // Envia os dados para o backend
      const response = await axios.post("http://localhost:3000/users", {
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
      // Captura a mensagem de erro retornada pela API
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
        <h2>CADASTRA-SE</h2>
      </div>
      {error && <p className="error">{error}</p>}
      <form className="div-dados" onSubmit={handleSubmit}>
        <label htmlFor="nome">Seu nome:</label>
        <input
          type="text"
          id="nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Digite seu nome"
        />
        <br />
        <label htmlFor="cpf">Seu CPF:</label>
        <input
          type="text"
          id="cpf"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
          placeholder="Digite seu CPF"
        />
        <br />
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
        <label htmlFor="endereco">Endereço:</label>
        <input
          type="text"
          id="endereco"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
          placeholder="Digite seu endereço"
        />
        <br />
        <label htmlFor="cep">CEP:</label>
        <input
          type="text"
          id="cep"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          required
          placeholder="Digite seu CEP"
        />
        <br />
        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Digite sua senha"
        />
        <br />
        <label htmlFor="confirmar-senha">Confirmar Senha:</label>
        <input
          type="password"
          id="confirmar-senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirme sua senha"
        />
        <br />
        <div className="buttons">
          <div className="link-home">
            <Link id="link-button" to="/">
              Ir para o Home
            </Link>
          </div>
          <div className="registrar">
            <button type="submit">Registrar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registro;
