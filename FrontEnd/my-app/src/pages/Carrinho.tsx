import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { isAxiosError } from "axios";
import "../styles/Carrinho.css";

interface ProdutoCarrinho {
  id: number;
  name: string;
  descricao: string;
  quantidade: number;
  preco?: {
    valor: number;
  };
}

const Carrinho = () => {
  const navigate = useNavigate();
  const [itensCarrinho, setItensCarrinho] = useState<ProdutoCarrinho[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const carregarItensDoCarrinho = () => {
      const carrinhoSalvo = localStorage.getItem("carrinho");
      if (carrinhoSalvo) {
        setItensCarrinho(JSON.parse(carrinhoSalvo));
      }
    };


    carregarItensDoCarrinho();

    window.addEventListener("storage", carregarItensDoCarrinho);

    const atualizarCarrinho = () => carregarItensDoCarrinho();
    window.addEventListener("carrinhoAtualizado", atualizarCarrinho);

    return () => {
      window.removeEventListener("storage", carregarItensDoCarrinho);
      window.removeEventListener("carrinhoAtualizado", atualizarCarrinho);
    };
  }, []);

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      console.log("Itens do carrinho:", JSON.parse(carrinhoSalvo));
      setItensCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itensCarrinho));
  }, [itensCarrinho]);

  const calcularTotal = () => {
    return itensCarrinho.reduce((total, item) => {
      return total + (item.preco?.valor || 0) * item.quantidade;
    }, 0);
  };

  const alterarQuantidade = (id: number, novaQuantidade: number) => {
    if (novaQuantidade < 1) return;

    setItensCarrinho((prevItens) =>
      prevItens.map((item) =>
        item.id === id ? { ...item, quantidade: novaQuantidade } : item
      )
    );
  };

  const removerItem = (id: number) => {
    setItensCarrinho((prevItens) => prevItens.filter((item) => item.id !== id));
  };

  const finalizarCompra = () => {

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id) {
      alert("Você precisa estar logado para finalizar a compra");
      navigate("/login");
      return;
    }

    navigate("/finalizar-compra", { state: { produtos: itensCarrinho } });
  };

  const continuarComprando = () => {
    navigate("/produtos");
  };

  return (
    <div className="carrinho-container">
      <div className="carrinho-titulo">
        <h2>Seu Carrinho</h2>
      </div>

      {error && <p className="mensagem-erro">{error}</p>}

      {itensCarrinho.length === 0 ? (
        <div className="carrinho-vazio">
          <p>Seu carrinho está vazio</p>
          <button onClick={continuarComprando} className="botao-continuar">
            Continuar Comprando
          </button>
        </div>
      ) : (
        <>
          <div className="lista-itens">
            {itensCarrinho.map((item) => (
              <div key={item.id} className="item-carrinho">
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.descricao}</p>
                  <p className="preco">
                    R${" "}
                    {item.preco?.valor
                      ? (item.preco.valor * item.quantidade).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
                <div className="item-controles">
                  <div className="controle-quantidade">
                    <button
                      onClick={() =>
                        alterarQuantidade(item.id, item.quantidade - 1)
                      }
                      disabled={item.quantidade <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantidade}</span>
                    <button
                      onClick={() =>
                        alterarQuantidade(item.id, item.quantidade + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="botao-remover"
                    onClick={() => removerItem(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="resumo-compra">
            <h3>Resumo da Compra</h3>
            <div className="total">
              <span>Total:</span>
              <span>R$ {calcularTotal().toFixed(2)}</span>
            </div>
            <button
              className="botao-finalizar"
              onClick={finalizarCompra}
              disabled={isLoading}
            >
              {isLoading ? "Processando..." : "Finalizar Compra"}
            </button>
            <button
              className="botao-continuar"
              onClick={continuarComprando}
            >
              Continuar Comprando
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrinho;
