import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const FormaPagamento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tipoPagamento, setTipoPagamento] = useState("");
  const [parcelas, setParcelas] = useState(1);
  const produto = location.state?.produto;
  const [error, setError] = useState("");

  const gerarParcelas = () => {
    const opçõesParcelamento = [];
    for (let i = 1; i <= 12; i++) {
      opçõesParcelamento.push(i);
    }
    return opçõesParcelamento;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (
      !tipoPagamento ||
      !produto ||
      !produto.id ||
      !produto.preco ||
      !user.id
    ) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    console.log("Dados enviados para o backend:", {
      tipoPagamento,
      produto,
      parcelas,
      userId: user.id,
    });

    try {
      const response = await axios.post(
        "/api/forma-pagamento/process",
        {
          tipoPagamento,
          produto,
          parcelas,
          userId: user.id,
        }
      );

      console.log("Forma de pagamento selecionada:", response.data);
      alert("Compra realizada com sucesso!");
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao registrar pagamento:",
          error.response?.data || error.message
        );
        setError(error.response?.data?.error || "Erro ao registrar pagamento");
      } else {
        console.error("Erro desconhecido:", error);
        setError("Erro desconhecido ao selecionar forma de pagamento");
      }
    }
  };

  return (
    <div className="formapagamento">
      <div className="h2-forma">
        <h2>Selecione sua forma de pagamento</h2>
      </div>
      {error && <p className="error">{error}</p>}
      {produto && (
        <div className="produto-info">
          <h3>{produto.name}</h3>
          <p>{produto.descricao}</p>
          <p>
            <strong>Preço:</strong> R$ {produto.preco}
          </p>
        </div>
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
            {" "}
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
            {" "}
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
            <button id="button-cancelar" onClick={() => navigate("/")}>
              Cancelar
            </button>
          </div>
          <div className="registrar">
            <button type="submit">Prosseguir</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormaPagamento;
