import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const FormaPagamento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const produto = location.state?.produto;

  const [tipoDePagamento, setTipoDePagamento] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/formapagamento",
        {
          tipoDePagamento,
          produto,
        }
      );

      console.log("Forma de pagamento selecionado:", response.data);
      alert("Forma de pagamento selecionado com sucesso!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Erro ao registrar pagamento"
        );
      } else {
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
          <label className="label-pag">
            <input
              className="input-pagamento"
              type="checkbox"
              value="pix"
              checked={tipoDePagamento === "pix"}
              onChange={() => setTipoDePagamento("pix")}
            />
            PIX
          </label>

          <label className="label-pag">
            <input
              className="input-pagamento"
              type="checkbox"
              value="credito"
              checked={tipoDePagamento === "credito"}
              onChange={() => setTipoDePagamento("credito")}
            />
            Crédito
          </label>

          <label className="label-pag">
            <input
              className="input-pagamento"
              type="checkbox"
              value="debito"
              checked={tipoDePagamento === "debito"}
              onChange={() => setTipoDePagamento("debito")}
            />
            Débito
          </label>
        </div>
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
