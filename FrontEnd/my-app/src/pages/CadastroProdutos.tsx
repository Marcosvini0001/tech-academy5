import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Produto {
  id: number;
  name: string;
  categoria: string;
  marca: string;
  preco: string;
  descricao: string;
}

const CadastroProdutos = () => {
  const [name, setName] = useState("");
  const [categoria, setCategoria] = useState("");
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
      const response = await axios.get("http://localhost:3000/produtos");
      setProdutos(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

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
      fetchProdutos();
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

  const handleDelete = async (id: number) => {
    console.log("ID do produto a ser deletado:", id);
    try {
      await axios.delete(`http://localhost:3000/produtos/${id}`);
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

      await axios.put(`http://localhost:3000/produtos/${produto.id}`, {
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
    <div className="registro">
      <div className="cabecalho-cadastro">
        <h2 className="titulo-cadastro">Cadastrar Produtos</h2>
      </div>

      {error && <p className="mensagem-erro">{error}</p>}

      <form className="formulario-produto" onSubmit={handleSubmit}>
        <div className="div-inputs">
          {" "}
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
          {" "}
          <label htmlFor="categoria">Categoria:</label>
          <input
            type="text"
            id="categoria"
            className="input-texto"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            placeholder="Digite a categoria"
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
          {" "}
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
          {" "}
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
        <h3 className="titulo-lista">Produtos Cadastrados</h3>
        <ul className="itens-produtos">
          {produtos.map((produto) => (
            <li className="item-produto" key={produto.id}>
              <strong>{produto.name}</strong> - {produto.descricao} - R${" "}
              {produto.preco}
              <div className="botoes-produto">
                <button
                  className="botao-atualizar"
                  onClick={() => handleUpdate(produto)}
                >
                  Atualizar
                </button>
                <button
                  className="botao-deletar"
                  onClick={() => handleDelete(produto.id)}
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CadastroProdutos;
