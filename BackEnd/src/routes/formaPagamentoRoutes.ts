import express from "express";
import { getAll, processPayment } from "../controllers/formaPagamentoController";

const router = express.Router();

router.get("/formapagamento", getAll);
router.post("/formapagamento/process", processPayment);

export default router;
