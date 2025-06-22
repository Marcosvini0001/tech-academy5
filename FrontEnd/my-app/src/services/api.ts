import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCart = (userId: number) => api.get(`/cart/${userId}`);
export const addToCart = (userId: number, produtoId: number, quantidade = 1) =>
  api.post("/cart", { userId, produtoId, quantidade });
export const updateCartItem = (id: number, quantidade: number) =>
  api.put(`/cart/${id}`, { quantidade });
export const deleteCartItem = (id: number) => api.delete(`/cart/${id}`);

export default api;