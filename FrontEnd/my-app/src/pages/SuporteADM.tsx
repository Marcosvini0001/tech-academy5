import { useEffect, useState } from "react";
import api from "../services/api";

interface Suporte {
  id: number;
  assunto: string;
  mensagem: string;
  userEmail: string;
  createdAt: string;
}

const SuporteADM = () => {
  const [suportes, setSuportes] = useState<Suporte[]>([]);

  useEffect(() => {
    api.get("/suporte").then(res => setSuportes(res.data));
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Excluir este suporte?")) return;
    await api.delete(`/suporte/${id}`);
    setSuportes(suportes.filter(s => s.id !== id));
  };

  // Adicione edição se desejar

  return (
    <div>
      <h2>Suportes Recebidos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Assunto</th>
            <th>Mensagem</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {suportes.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.userEmail}</td>
              <td>{s.assunto}</td>
              <td>{s.mensagem}</td>
              <td>{new Date(s.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDelete(s.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuporteADM;