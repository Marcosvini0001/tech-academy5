import express from "express";
import {
  createAvaliacao,
  getAvaliacoesByProduto,
  updateAvaliacao,
  deleteAvaliacao,
} from "../controllers/avaliacaoController";

const router = express.Router();

router.post("/avaliacoes", createAvaliacao);
router.get("/avaliacoes/:id_produto", getAvaliacoesByProduto);
router.put("/avaliacoes/:id", updateAvaliacao);
router.delete("/avaliacoes/:id", deleteAvaliacao);

export default router;