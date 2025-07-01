import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Carrinho.css";

interface ProdutoCarrinho {
  id: number;
  name: string;
  descricao: string;
  quantidade: number;
  preco?: {
    valor: number;
  };
  imagemUrl?: string;
}

const Carrinho = () => {
  const navigate = useNavigate();
  const [itensCarrinho, setItensCarrinho] = useState<ProdutoCarrinho[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const carregarItensDoCarrinho = () => {
      const itens = localStorage.getItem("carrinho");
      if (itens) {
        setItensCarrinho(JSON.parse(itens));
      } else {
        setItensCarrinho([]);
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

  const calcularTotal = () => {
    return itensCarrinho.reduce(
      (total, item) =>
        total + (item.preco?.valor || 0) * (item.quantidade || 1),
      0
    );
  };

  const alterarQuantidade = (id: number, novaQuantidade: number) => {
    if (novaQuantidade < 1) return;
    const novosItens = itensCarrinho.map((item) =>
      item.id === id ? { ...item, quantidade: novaQuantidade } : item
    );
    setItensCarrinho(novosItens);
    localStorage.setItem("carrinho", JSON.stringify(novosItens));
  };

  const removerItem = (id: number) => {
    const novosItens = itensCarrinho.filter((item) => item.id !== id);
    setItensCarrinho(novosItens);
    localStorage.setItem("carrinho", JSON.stringify(novosItens));
  };

  const finalizarCompra = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Compra finalizada com sucesso!");
      setItensCarrinho([]);
      localStorage.removeItem("carrinho");
      navigate("/");
    }, 1500);
  };

  const continuarComprando = () => {
    navigate("/produtos");
  };

  return (
    <div className="carrinho-container">
      <div className="carrinho-titulo">
        <h2>Seu Carrinho</h2>
      </div>
      {itensCarrinho.length === 0 ? (
        <div className="carrinho-vazio">
          <p>Seu carrinho está vazio</p>
          <button onClick={continuarComprando} className="botao-continuar">
            Continuar Comprando
          </button>
        </div>
      ) : (
        <div className="carrinho-conteudo">
          <div className="lista-itens">
            {itensCarrinho.map((item) => (
              <div key={item.id} className="item-carrinho">
                <img
                  className="item-img"
                  src={item.imagemUrl || "/img/produto-default.png"}
                  alt={item.name}
                />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.descricao}</p>
                  <p className="preco">
                    R$ {item.preco?.valor ? (item.preco.valor * item.quantidade).toFixed(2) : "0.00"}
                  </p>
                </div>
                <div className="item-controles">
                  <div className="controle-quantidade">
                    <button
                      onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}
                      disabled={item.quantidade <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantidade}</span>
                    <button
                      onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}
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
        </div>
      )}
      {error && <div className="mensagem-erro">{error}</div>}
    </div>
  );
};

export default Carrinho;
