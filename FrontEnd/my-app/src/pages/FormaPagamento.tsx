import { useNavigate, useLocation, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import api from "../services/api";
import { isAxiosError } from "axios";
import "../styles/FormaPagamento.css";

// Interface simplificada para evitar objetos complexos
interface PrecoSimples {
  valor: number;
}

interface ProdutoSimples {
  id: number;
  name: string;
  descricao: string;
  preco?: PrecoSimples;
}

const FormaPagamento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Captura o ID da URL
  const [tipoPagamento, setTipoPagamento] = useState("");
  const [parcelas, setParcelas] = useState(1);
  const [produto, setProduto] = useState<ProdutoSimples | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Primeiro, verifica se temos o produto no state da navegação
    if (location.state?.produto) {
      try {
        const produtoOriginal = location.state.produto;
        const produtoSeguro = {
          id: Number(produtoOriginal.id || 0),
          name: String(produtoOriginal.name || ''),
          descricao: String(produtoOriginal.descricao || ''),
          preco: produtoOriginal.preco ? {
            valor: Number(produtoOriginal.preco.valor || 0)
          } : undefined
        };
        setProduto(produtoSeguro);
      } catch (err) {
        console.error("Erro ao processar dados do produto do state:", err);
        setError("Erro ao processar informações do produto");
      }
    } 
    // Se não tiver no state mas temos o ID na URL, buscar da API
    else if (id) {
      fetchProdutoById(Number(id));
    } 
    // Não tem produto nem no state nem na URL
    else {
      setError("Nenhum produto foi selecionado para compra");
    }
  }, [location.state, id]);

  // Função para buscar produto pelo ID
  const fetchProdutoById = async (produtoId: number) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/produtos/${produtoId}`);
      
      // Formatar o produto recebido da API
      const produtoData = response.data;
      const produtoSeguro = {
        id: Number(produtoData.id || 0),
        name: String(produtoData.name || ''),
        descricao: String(produtoData.descricao || ''),
        preco: produtoData.preco ? {
          valor: Number(produtoData.preco.valor || 0)
        } : undefined
      };
      
      setProduto(produtoSeguro);
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      setError("Não foi possível carregar as informações do produto");
    } finally {
      setIsLoading(false);
    }
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

    // Verificar se o usuário está logado
    const user = JSON.parse(localStorage.getItem("user") || "{}");
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

    if (!produto) {
      setError("Produto inválido");
      setIsLoading(false);
      return;
    }
    
    try {
      // Simplificar os dados enviados para evitar problemas
      const dadosCompra = {
        tipoPagamento,
        produto: {
          id: produto.id,
          preco: produto.preco?.valor || 0
        },
        parcelas,
        userId: user.id
      };
      
      console.log("Dados sendo enviados:", dadosCompra);

      const response = await api.post("/forma-pagamento/process", dadosCompra);

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

  return (
    <div className="formapagamento">
      <div className="h2-forma">
        <h2>Selecione sua forma de pagamento</h2>
      </div>
      
      {error && <p className="error" style={{ color: "red" }}>{error}</p>}
      
      {produto ? (
        <div className="produto-info">
          <h3>{produto.name}</h3>
          <p>{produto.descricao}</p>
          <p>
            <strong>Preço:</strong> R$ {produto.preco?.valor ? Number(produto.preco.valor).toFixed(2) : "0.00"}
          </p>
        </div>
      ) : (
        <p>Carregando informações do produto...</p>
      )}
      
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

        <br />
        <div className="buttons">
          <div>
            <button 
              type="button" 
              id="button-cancelar" 
              onClick={() => navigate("/produtos")}
            >
              Cancelar
            </button>
          </div>
          <div className="registrar">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Processando..." : "Prosseguir"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormaPagamento;
