import { useEffect, useState } from "react";
import axios from "axios";

interface Pedido {
  id_item_pedido: number;
  id_produto: number;
  precoCompra: string;
  quantidade: number;
}

const Compras = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        console.error("Erro ao buscar pedidos:", error.response?.data || error.message);
        setError(error.response?.data?.error || "Erro ao buscar pedidos.");
      } else {
        console.error("Erro desconhecido:", error);
        setError("Erro desconhecido ao buscar pedidos.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div>
      <h2>Minhas Compras</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {Array.isArray(pedidos) && pedidos.map((pedido) => (
            <li key={pedido.id_item_pedido}>
              <p>Produto ID: {pedido.id_produto}</p>
              <p>Endereço: {pedido.precoCompra}</p>
              <p>Quantidade: {pedido.quantidade}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Compras;