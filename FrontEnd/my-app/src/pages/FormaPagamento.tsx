import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const FormaPagamento = () => {
  const [tipoDePagamento, setTipoDePagamento] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/formapagamento",
        {
          tipoDePagamento,
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
      <form className="div-dados" onSubmit={handleSubmit}>
        <label htmlFor="nome">Seu nome:</label>
        <select
          id="pagamento"
          value={tipoDePagamento}
          onChange={(e) => setTipoDePagamento(e.target.value)}
          required
        >
          <option value="">Selecione uma opção</option>
          <option value="pix">PIX</option>
          <option value="cartao_credito">Cartão de Crédito</option>
          <option value="cartao_debito">Cartão de Débito</option>
        </select>
        <br />
        <div className="buttons">
          <div className="link-home">
            <Link id="link-button" to="/">
              Ir para o Home
            </Link>
          </div>
          <div className="registrar">
            <button type="submit">Registrar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormaPagamento;
