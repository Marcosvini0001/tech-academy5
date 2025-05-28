import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../componentes/Header";
import axios from "axios";

const Suporte = () => {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");
  const [assunto, setAssunto] = useState("feedback");
  const [status, setStatus] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/suporte", {
        assunto,
        mensagem,
        user: JSON.parse(localStorage.getItem("user") || "{}"),
      });

      setStatus("Mensagem enviada com sucesso!");
      setMensagem("");
      setAssunto("feedback");
    } catch (error) {
      console.error("Erro ao enviar suporte:", error);
      setStatus("Erro ao enviar mensagem.");
    }
  };

  return (
    <>
      <Header />
      <div className="suporte">
        <div className="h2-suporte">
          <h2>SUPORTE</h2>
        </div>

        {!isLoggedIn ? (
          <div className="nao-logado">
            <p className="mensagem-login">
              Você precisa estar <strong>logado</strong> para enviar uma mensagem de suporte.
            </p>
            <button onClick={() => navigate("/login")} className="btn-entrar">
              Fazer Login
            </button>
          </div>
        ) : (
          <>
            {status && <p className="status-suporte">{status}</p>}
            <form onSubmit={handleSubmit}>
              <div className="div-inputs">
                <label>Assunto:</label>
                <select
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  className="select-assunto"
                >
                  <option value="feedback">Feedback</option>
                  <option value="elogio">Elogio</option>
                  <option value="reclamacao">Reclamação</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
              <div className="div-inputs">
                <label>Mensagem:</label>
                <textarea
                  className="textarea-suporte"
                  placeholder="Escreva sua mensagem aqui..."
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="div-button-suporte">
                <button type="submit">Enviar</button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Suporte;
