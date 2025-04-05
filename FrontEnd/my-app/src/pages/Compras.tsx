import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.get(
        `http://localhost:3000/itemPedido/compras/${user.id}`
      );
      setPedidos(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
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

   
    const senha = prompt("Digite sua senha para confirmar a alteração do endereço:");
    if (!senha) {
      setErro("A senha é obrigatória.");
      return;
    }

    try {

      const response = await axios.put(
        `http://localhost:3000/users/${user.id}/address`,
        { endereco: novoEndereco, senha }
      );
      setMensagem(response.data.message);
      setErro("");
    } catch (error) {
      console.error("Erro ao atualizar endereço:", error);
      if (axios.isAxiosError(error)) {
        setErro(error.response?.data?.error || "Erro ao atualizar endereço.");
      } else {
        setErro("Erro desconhecido ao atualizar endereço.");
      }
      setMensagem("");
    }
  };

  const handleUpdateOrderAddress = async (id_item_pedido: number) => {
    try {
      await axios.put(
        `http://localhost:3000/itemPedido/${id_item_pedido}/endereco`,
        { userId: user.id }
      );
      alert("Endereço do pedido atualizado com sucesso!");
      fetchPedidos();
    } catch (error) {
      console.error("Erro ao atualizar endereço do pedido:", error);
      setErro("Erro ao atualizar endereço do pedido.");
    }
  };

  const handleDeletePedido = async (id_item_pedido: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este pedido?")) return;

    try {
      await axios.delete(`http://localhost:3000/itemPedido/${id_item_pedido}`);
      alert("Pedido excluído com sucesso!");
      fetchPedidos();
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
      setErro("Erro ao excluir pedido.");
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div>
      <h2>Bem-vindo, {user.name}</h2>

      <div>
        <h3>Atualizar Endereço</h3>
        {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <input
          type="text"
          placeholder="Digite seu novo endereço"
          value={novoEndereco}
          onChange={(e) => setNovoEndereco(e.target.value)}
        />
        <button onClick={handleUpdateUserAddress}>Atualizar Endereço</button>
      </div>

      <div>
        <h3>Meus Pedidos</h3>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <ul>
            {Array.isArray(pedidos) &&
              pedidos.map((pedido) => (
                <li key={pedido.id_item_pedido}>
                  <p>Produto ID: {pedido.id_produto}</p>
                  <p>Endereço: {pedido.enderecoEntrega}</p>
                  <p>Quantidade: {pedido.quantidade}</p>
                  <button
                    onClick={() =>
                      handleUpdateOrderAddress(pedido.id_item_pedido)
                    }
                  >
                    Alterar Endereço do Pedido
                  </button>
                  <button
                    onClick={() => handleDeletePedido(pedido.id_item_pedido)}
                  >
                    Apagar Pedido
                  </button>
                </li>
              ))}
            
          </ul>
        )}
      </div>
      <button onClick={() => navigate("/")}>Ir para o Home</button>
    </div>
  );
};

export default Usuario;