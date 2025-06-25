import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/MeusSuportes.css";
import Header from "../componentes/Header";

interface Suporte {
  id: number;
  assunto: string;
  mensagem: string;
  userEmail: string;
  createdAt: string;
}

const MeusSuportes = () => {
  const navigate = useNavigate();
  const [suportes, setSuportes] = useState<Suporte[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editando, setEditando] = useState<number | null>(null);
  const [mensagemEditada, setMensagemEditada] = useState("");
  const [assuntoEditado, setAssuntoEditado] = useState("");
  const [mensagemStatus, setMensagemStatus] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (!user || !user.email) {
      navigate("/login");
      return;
    }
    
    const fetchSuportes = async () => {
      try {
        const response = await api.get(`/suporte/user/${user.email}`);
        setSuportes(response.data);
      } catch (err) {
        console.error("Erro ao buscar suportes:", err);
        setError("Não foi possível carregar seus suportes.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSuportes();
  }, [navigate]);

  const formatarData = (data: string) => {
    return new Date(data).toLocaleString('pt-BR');
  };

  const handleEditar = (suporte: Suporte) => {
    setEditando(suporte.id);
    setMensagemEditada(suporte.mensagem);
    setAssuntoEditado(suporte.assunto);
  };

  const handleCancelar = () => {
    setEditando(null);
  };

  const handleSalvar = async (id: number) => {
    try {
      await api.put(`/suporte/${id}`, {
        assunto: assuntoEditado,
        mensagem: mensagemEditada
      });
      
      setSuportes(suportes.map(s => 
        s.id === id 
          ? { ...s, assunto: assuntoEditado, mensagem: mensagemEditada } 
          : s
      ));
      
      setEditando(null);
      setMensagemStatus("Suporte atualizado com sucesso!");
      
      // Limpar a mensagem de status após 3 segundos
      setTimeout(() => setMensagemStatus(""), 3000);
    } catch (err) {
      console.error("Erro ao atualizar suporte:", err);
      setError("Erro ao atualizar suporte.");
    }
  };

  return (
    <>
      <Header />
      <div className="meus-suportes-container">
        <div className="meus-suportes-header">
          <h2>Meus Chamados de Suporte</h2>
        </div>
        
        {mensagemStatus && <div className="mensagem-sucesso">{mensagemStatus}</div>}
        {error && <div className="mensagem-erro">{error}</div>}
        
        {isLoading ? (
          <div className="loading">Carregando...</div>
        ) : suportes.length === 0 ? (
          <div className="sem-suportes">
            <p>Você ainda não abriu nenhum chamado de suporte.</p>
            <button onClick={() => navigate("/suporte")} className="botao-novo-suporte">
              Abrir Novo Chamado
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => navigate("/suporte")} className="botao-novo-suporte">
              Abrir Novo Chamado
            </button>
            
            <div className="lista-suportes">
              {suportes.map((suporte) => (
                <div key={suporte.id} className="card-suporte">
                  <div className="suporte-header">
                    <h3>Assunto: {editando === suporte.id ? (
                      <select 
                        value={assuntoEditado} 
                        onChange={(e) => setAssuntoEditado(e.target.value)}
                        className="select-assunto-edit"
                      >
                        <option value="feedback">Feedback</option>
                        <option value="elogio">Elogio</option>
                        <option value="reclamacao">Reclamação</option>
                        <option value="outros">Outros</option>
                      </select>
                    ) : suporte.assunto}</h3>
                    <span className="data-suporte">{formatarData(suporte.createdAt)}</span>
                  </div>
                  
                  <div className="suporte-conteudo">
                    {editando === suporte.id ? (
                      <textarea 
                        value={mensagemEditada}
                        onChange={(e) => setMensagemEditada(e.target.value)}
                        className="textarea-edit"
                      />
                    ) : (
                      <p>{suporte.mensagem}</p>
                    )}
                  </div>
                  
                  <div className="suporte-acoes">
                    {editando === suporte.id ? (
                      <>
                        <button 
                          onClick={() => handleSalvar(suporte.id)}
                          className="botao-salvar"
                        >
                          Salvar
                        </button>
                        <button 
                          onClick={handleCancelar}
                          className="botao-cancelar"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => handleEditar(suporte)}
                        className="botao-editar"
                      >
                        Editar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MeusSuportes;