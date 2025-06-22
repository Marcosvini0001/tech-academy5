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

const ControleProdutos = () => {
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
      setProdutos(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/produtos", {
        name,
        marca,
        preco,
        descricao,
      });

      console.log("Produto registrado:", response.data);
      alert("Produto registrado com sucesso!");
      fetchProdutos();
      setError(""); 
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Erro ao registrar o produto"
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
    <div className="controle-produtos">
      <div className="h2-controle">
        <h2 className="titulo-controle-produtos">Produtos Cadastrados</h2>
      </div>

      {error && <p className="mensagem-erro">{error}</p>}

      <div className="lista-produtos">
        {Array.isArray(produtos) && produtos.length > 0 ? (
          produtos.map((produto) => (
            <div key={produto.id}>
              <h3>{produto.name}</h3>
              <p>{produto.descricao}</p>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default ControleProdutos;
