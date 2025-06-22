import React, { useEffect, useState } from "react";
import api from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  endereco: string;
  cep: string;
}

const ListaDeUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsuarios();
  }, [page]);

  const fetchUsuarios = async () => {
    try {
      const response = await api.get(`/users?page=${page}&limit=10`);
      setUsuarios(response.data.data);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setError("Erro ao buscar usuários.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      await api.delete(`/users/${id}`);
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      alert("Usuário excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      setError("Erro ao excluir usuário.");
    }
  };

  const handleUpdate = async (usuario: User) => {
    const novoNome = prompt("Novo nome para o usuário:", usuario.name);
    if (!novoNome) return;

    try {
      await api.put(`/users/${usuario.id}`, {
        ...usuario,
        name: novoNome,
      });

      setUsuarios(
        usuarios.map((user) =>
          user.id === usuario.id ? { ...user, name: novoNome } : user
        )
      );
      alert("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      setError("Erro ao atualizar usuário.");
    }
  };

  return (
    <div>
      <h2 className="h2-lista-usuario">Lista de Usuários</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table cellPadding="10" border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Endereço</th>
            <th>CEP</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>{usuario.cpf}</td>
                <td>{usuario.endereco}</td>
                <td>{usuario.cep}</td>
                <td className="td-btn">
                  <button
                    className="edit-btn"
                    onClick={() => handleUpdate(usuario)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(usuario.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>Nenhum usuário encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaDeUsuarios;
