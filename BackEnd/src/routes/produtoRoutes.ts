import express from "express";
import {
  getAll,
  createProduto,
  updateProduto,
} from "../controllers/produtoController";

const router = express.Router();

router.get("/produtos", getAll);
router.post("/produtos", createProduto);
router.put("/produtos/:id", updateProduto);
export default router;
