import express from "express";
import {
  getAll,
  createitemP,
  updateitemP,
  getItemsByUser,
  getUserPurchases,
  updateDeliveryAddress,
  cancelOrder,
  getCompras,
} from "../controllers/itemPController";

const router = express.Router();

router.get("/", getAll);
router.get("/user/:userId", getItemsByUser);
router.get("/compras/:userId", getUserPurchases); 
router.post("/", createitemP);
router.put("/:id_item_pedido", updateitemP);
router.put("/:id_item_pedido/endereco", updateDeliveryAddress);
router.delete("/:id_item_pedido", cancelOrder);

export default router;