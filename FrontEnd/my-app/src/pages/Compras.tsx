import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { isAxiosError } from "axios";

interface Pedido {
  id_item_pedido: number;
  id_produto: number;
  precoCompra: string;
  quantidade: number;
  enderecoEntrega: string;
}

const Usuario = () => {
  const [novoEndereco, setNovoEndereco] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchPedidos = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/item-pedido/compras/${user.id}`);
      setPedidos(response.data);
      setErro("");
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          "Erro ao buscar pedidos:",
          error.response?.data || error.message
        );
        setErro(error.response?.data?.error || "Erro ao buscar pedidos.");
      } else {
        console.error("Erro desconhecido:", error);
        setErro("Erro desconhecido ao buscar pedidos.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUserAddress = async () => {
    if (!novoEndereco) {
      setErro("O endereço não pode estar vazio.");
      return;
    }

    const senha = prompt(
      "Digite sua senha para confirmar a alteração do endereço:"
    );
    if (!senha) {
      setErro("A senha é obrigatória.");
      return;
    }

    try {
      const response = await api.put(
        `/users/${user.id}/address`,
        { endereco: novoEndereco, senha }
      );
      setMensagem(response.data.message);
      setErro("");
    } catch (error) {
      if (isAxiosError(error)) {
        setErro(error.response?.data?.error || "Erro ao atualizar endereço.");
      } else {
        setErro("Erro desconhecido ao atualizar endereço.");
      }
      setMensagem("");
    }
    fetchPedidos();
  };

  const handleUpdateOrderAddress = async (id_item_pedido: number) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    try {
      await api.put(
        `/item-pedido/${id_item_pedido}/endereco`,
        { userId: user.id }
      );
      alert("Endereço do pedido atualizado com sucesso!");
      fetchPedidos();
    } catch (error) {
      if (isAxiosError(error)) {
        setErro(error.response?.data?.error || "Erro ao atualizar endereço do pedido.");
      } else {
        setErro("Erro ao atualizar endereço do pedido.");
      }
      console.error("Erro ao atualizar endereço do pedido:", error);
    }
  };

  const handleDeletePedido = async (id_item_pedido: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este pedido?")) return;

    try {
      await api.delete(`/item-pedido/${id_item_pedido}`);
      alert("Pedido excluído com sucesso!");
      fetchPedidos();
    } catch (error) {
      if (isAxiosError(error)) {
        setErro(error.response?.data?.error || "Erro ao excluir pedido.");
      } else {
        setErro("Erro ao excluir pedido.");
      }
      console.error("Erro ao excluir pedido:", error);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div>
      <div className="header-compras">
        <h2>Bem-vindo, {user.name}</h2>
      </div>

      <div className="div-end">
        <div className="h3-compras">
          {" "}
          <h3>Atualizar Endereço</h3>
        </div>

        {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <input
          className="input-compras"
          type="text"
          placeholder="Digite seu novo endereço"
          value={novoEndereco}
          onChange={(e) => setNovoEndereco(e.target.value)}
        />
        <button className="button-compras" onClick={handleUpdateUserAddress}>
          Atualizar Endereço
        </button>
      </div>

      <div className="ul-compra">
        <h3>Meus Pedidos</h3>
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <ul>
            {Array.isArray(pedidos) &&
              pedidos.map((pedido) => (
                <li className="li-compra" key={pedido.id_item_pedido}>
                  <div className="p-compra">
                    {" "}
                    <p>Produto ID: {pedido.id_produto}</p>
                  </div>
                  <div className="p-compra">
                    {" "}
                    <p>Endereço: {pedido.enderecoEntrega}</p>
                  </div>
                  <div className="p-compra">
                    {" "}
                    <p>Quantidade: {pedido.quantidade}</p>
                  </div>
                  <button
                    className="edit-compra"
                    onClick={() =>
                      handleUpdateOrderAddress(pedido.id_item_pedido)
                    }
                  >
                    Alterar Endereço do Pedido
                  </button>
                  <button
                    className="del-compra"
                    onClick={() => handleDeletePedido(pedido.id_item_pedido)}
                  >
                    Apagar Pedido
                  </button>
                </li>
              ))}
          </ul>
        )}
        <button className="btn-home" onClick={() => navigate("/")}>
          Ir para o Home
        </button>
      </div>
    </div>
  );
};

export default Usuario;

