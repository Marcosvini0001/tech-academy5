import express from "express";
import { getAll, processPayment } from "../controllers/formaPagamentoController";

const router = express.Router();

router.get("/", getAll);
router.post("/process", processPayment);

export default router;
