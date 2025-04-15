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

const ControleProdutos = () => {
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
    <div className="controle-produtos">
      <div className="h2-controle">
        <h2 className="titulo-controle-produtos">Produtos Cadastrados</h2>
      </div>

      {error && <p className="mensagem-erro">{error}</p>}

      <div className="lista-produtos">
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

export default ControleProdutos;