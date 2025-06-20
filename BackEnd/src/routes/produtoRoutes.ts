import express from "express";
import {
  getAll,
  createProduto,
  updateProduto,
  deleteProduto,
} from "../controllers/produtoController";

const router = express.Router();

router.get("/", getAll);
router.post("/", createProduto);
router.put("/:id", updateProduto);
router.delete("/:id", deleteProduto);

export default router;
