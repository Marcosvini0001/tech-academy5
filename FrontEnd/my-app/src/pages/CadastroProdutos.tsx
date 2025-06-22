import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import api from "../services/api";
import { isAxiosError } from "axios";

interface Produto {
  id: number;
  name: string;
  marca: string;
  preco: string;
  descricao: string;
}

const CadastroProdutos = () => {
  const [name, setName] = useState("");
  const [marca, setMarca] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await api.get("/produtos");
      const data = response.data as Produto[];
      setProdutos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !marca || !preco || !descricao) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (isNaN(Number(preco))) {
      setError("Preço deve ser um número válido.");
      return;
    }

    try {
      const response = await api.post("/produtos", {
        name,
        marca,
        precoValor: Number(preco), 
        descricao,
      });

      alert("Produto registrado com sucesso!");
      fetchProdutos();
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setError(
          ((error.response?.data as { message?: string })?.message) || "Erro ao registrar o produto"
        );
      } else {
        setError("Erro desconhecido ao registrar produto");
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/produtos/${id}`);
      alert("Produto deletado com sucesso!");
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const handleUpdate = async (produto: Produto) => {
    try {
      const updatedName = prompt("Atualize o nome do produto:", produto.name);
      if (!updatedName) return;

      await api.put(`/produtos/${produto.id}`, {
        ...produto,
        name: updatedName,
      });

      alert("Produto atualizado com sucesso!");
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  return (
    <div className="cadastro">
      <div className="h2-cadastro">
        <h2 className="titulo-cadastro">Cadastrar Produtos</h2>
      </div>

      {error && <p className="mensagem-erro">{error}</p>}

      <form className="formulario-produto" onSubmit={handleSubmit}>
        <div className="div-inputs">
          <label htmlFor="nome">Nome do produto:</label>
          <input
            type="text"
            id="nome"
            className="input-texto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Digite nome do produto"
          />
        </div>

        <div className="div-inputs">
          <label htmlFor="marca">Marca:</label>
          <input
            type="text"
            id="marca"
            className="input-texto"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
            placeholder="Marca do produto"
          />
        </div>

        <div className="div-inputs">
          <label htmlFor="preco">Preço:</label>
          <input
            type="text"
            id="preco"
            className="input-texto"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
            placeholder="Preço do produto"
          />
        </div>

        <div className="div-inputs">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            className="input-texto"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            placeholder="Descrição"
          />
        </div>

        <div className="botoes-formulario">
          <Link className="botao-voltar" to="/">
            Ir para o Home
          </Link>
          <button className="botao-enviar" type="submit">
            Cadastrar
          </button>
        </div>
      </form>
      <div className="lista-produtos">
        <h3>Produtos cadastrados</h3>
        <ul>
          {Array.isArray(produtos) &&
            produtos.map((produto) => (
              <li key={produto.id}>
                <span>{produto.name}</span>
                <button onClick={() => handleUpdate(produto)}>Editar</button>
                <button onClick={() => handleDelete(produto.id)}>Deletar</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CadastroProdutos;
