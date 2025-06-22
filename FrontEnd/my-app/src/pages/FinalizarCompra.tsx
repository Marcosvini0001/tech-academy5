import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { isAxiosError } from "axios";
import "../styles/FinalizarCompra.css";

interface Produto {
  id: number;
  name: string;
  descricao: string;
  quantidade: number;
  preco?: {
    valor: number;
  };
}

const FinalizarCompra = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const produtos = location.state?.produtos as Produto[] || [];
  
  const [tipoPagamento, setTipoPagamento] = useState("");
  const [parcelas, setParcelas] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const calcularTotal = () => {
    return produtos.reduce((total, item) => {
      return total + (item.preco?.valor || 0) * item.quantidade;
    }, 0);
  };
  
  const gerarParcelas = () => {
    const opçõesParcelamento = [];
    for (let i = 1; i <= 12; i++) {
      opçõesParcelamento.push(i);
    }
    return opçõesParcelamento;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user.id) {
      setError("Você precisa estar logado para realizar uma compra");
      setIsLoading(false);
      return;
    }

    if (!tipoPagamento) {
      setError("Selecione uma forma de pagamento");
      setIsLoading(false);
      return;
    }

    if (produtos.length === 0) {
      setError("Carrinho vazio");
      setIsLoading(false);
      return;
    }
    
    try {
      // Criar um array de pedidos para cada produto no carrinho
      const pedidos = produtos.map(produto => ({
        tipoPagamento,
        produto: {
          id: produto.id,
          preco: produto.preco?.valor || 0,
          quantidade: produto.quantidade
        },
        parcelas,
        userId: user.id
      }));
      
      // Enviar pedidos para a API
      const response = await api.post("/forma-pagamento/process-bulk", {
        pedidos
      });
      
      // Limpar o carrinho após compra bem-sucedida
      localStorage.removeItem("carrinho");
      
      console.log("Resposta do servidor:", response.data);
      alert("Compra realizada com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro completo:", error);
      
      if (isAxiosError(error)) {
        setError(error.response?.data?.error || "Erro ao processar pagamento");
      } else {
        setError("Erro desconhecido ao processar pagamento");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (produtos.length === 0) {
    return (
      <div className="finalizar-compra">
        <p>Nenhum produto para finalizar a compra.</p>
        <button onClick={() => navigate("/produtos")}>Ir às compras</button>
      </div>
    );
  }

  return (
    <div className="finalizar-compra">
      <div className="h2-finalizar">
        <h2>Finalizar Compra</h2>
      </div>
      
      {error && <p className="error" style={{ color: "red" }}>{error}</p>}
      
      <div className="resumo-produtos">
        <h3>Itens do Carrinho</h3>
        <ul className="lista-produtos-resumo">
          {produtos.map((produto) => (
            <li key={produto.id} className="produto-resumo">
              <div className="produto-info-resumo">
                <h4>{produto.name}</h4>
                <p>Quantidade: {produto.quantidade}</p>
                <p>
                  Preço unitário: R$ {produto.preco?.valor 
                    ? Number(produto.preco.valor).toFixed(2) 
                    : "0.00"}
                </p>
                <p>
                  Subtotal: R$ {produto.preco?.valor 
                    ? (produto.preco.valor * produto.quantidade).toFixed(2) 
                    : "0.00"}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="valor-total">
          <h3>Valor Total: R$ {calcularTotal().toFixed(2)}</h3>
        </div>
      </div>
      
      <form className="div-dados" onSubmit={handleSubmit}>
        <div className="opcoes-pagamento">
          <div className="div-forma-pagamento">
            <label className="label-pag">
              <input
                type="radio"
                value="pix"
                checked={tipoPagamento === "pix"}
                onChange={() => setTipoPagamento("pix")}
              />
              PIX
            </label>
          </div>
          <div className="div-forma-pagamento">
            <label className="label-pag">
              <input
                type="radio"
                value="credito"
                checked={tipoPagamento === "credito"}
                onChange={() => setTipoPagamento("credito")}
              />
              Crédito
            </label>
          </div>
          <div className="div-forma-pagamento">
            <label className="label-pag">
              <input
                type="radio"
                value="debito"
                checked={tipoPagamento === "debito"}
                onChange={() => setTipoPagamento("debito")}
              />
              Débito
            </label>
          </div>
        </div>

        {tipoPagamento === "credito" && (
          <div className="parcelamento">
            <h3>Escolha o número de parcelas</h3>
            <select
              className="select"
              value={parcelas}
              onChange={(e) => setParcelas(Number(e.target.value))}
            >
              {gerarParcelas().map((parcela) => (
                <option key={parcela} value={parcela}>
                  {parcela} vez{parcela > 1 ? "es" : ""}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="buttons">
          <div>
            <button 
              type="button" 
              id="button-cancelar" 
              onClick={() => navigate("/carrinho")}
            >
              Voltar ao Carrinho
            </button>
          </div>
          <div className="registrar">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Processando..." : "Finalizar Compra"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FinalizarCompra;