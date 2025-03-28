import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const CadastroProdutos = () => {
  const [name, setName] = useState("");
  const [categoria, setCategoria] = useState("");
  const [marca, setMarca] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/produtos", {
        name,
        categoria,
        marca,
        preco,
        descricao,
      });

      console.log("Produto registrado:", response.data);
      alert("Produto registrado com sucesso!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Erro ao registrar o produto"
        );
      } else {
        setError("Erro desconhecido ao registrar produto");
      }
    }
  };

  return (
    <div className="registro">
      <h1>Cadastrar Produtos</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="div-dados" onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome do produto:</label>
        <input
          type="text"
          id="nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Digite nome do produto"
        />
        <br />
        <label htmlFor="cpf">Categoria:</label>
        <input
          type="text"
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          placeholder="Digite a categoria"
        />
        <br />
        <label htmlFor="email">Marca:</label>
        <input
          type="text"
          id="marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          required
          placeholder="Marca do produto"
        />
        <br />
        <label htmlFor="endereco">Preco:</label>
        <input
          type="text"
          id="preco"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
          placeholder="Preço do produto"
        />
        <br />
        <label htmlFor="cep">Descrição:</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          placeholder="Descrição"
        />
        <br />
        <div className="buttons">
          <div className="link-home">
            <Link id="link-button" to="/">
              Ir para o Home
            </Link>
          </div>
          <div className="registrar">
            <button type="submit">Cadastrar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CadastroProdutos;
