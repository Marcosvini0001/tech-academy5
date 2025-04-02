import express from "express";
import {
  getAll,
  createProduto,
  updateProduto,
  deleteProduto,
} from "../controllers/produtoController";

const router = express.Router();

router.get("/produtos", getAll);
router.post("/produtos", createProduto);
router.put("/produtos/:id", updateProduto);
router.delete("/produtos/:id", deleteProduto); 

export default router;
