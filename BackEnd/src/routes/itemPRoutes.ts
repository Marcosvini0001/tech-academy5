import express from "express";
import {
  getAll,
  createitemP,
  updateitemP,
} from "../controllers/itemPController";

const router = express.Router();

router.get("/itemPedido", getAll);
router.post("/itemPedido", createitemP);
router.put("/itemPedido/:id_item_pedido", updateitemP);
export default router;