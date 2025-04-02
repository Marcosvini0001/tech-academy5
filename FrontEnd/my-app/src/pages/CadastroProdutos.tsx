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
      <div className="h2-cadastro">
        <h2>CADASTRAR PRODUTOS</h2>
      </div>
      {error && <p className="error">{error}</p>}
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

      <div className="produtos-lista">
        <h3>Produtos Cadastrados</h3>
        <ul>
          {produtos.map((produto) => (
            <li key={produto.id}>
              <strong>{produto.name}</strong> - {produto.descricao} - R${" "}
              {produto.preco}
              <button onClick={() => handleUpdate(produto)}>Atualizar</button>
              <button onClick={() => handleDelete(produto.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CadastroProdutos;
