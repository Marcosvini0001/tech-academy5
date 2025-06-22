import { Router } from "express";
import * as formaPagamentoController from "../controllers/formaPagamentoController";

const router = Router();

// Rotas existentes
router.post("/process", formaPagamentoController.processPayment);
router.get("/", formaPagamentoController.getAll);

// Adicionar a nova rota para processamento em lote
router.post("/process-bulk", formaPagamentoController.processBulkPayment);

export default router;
