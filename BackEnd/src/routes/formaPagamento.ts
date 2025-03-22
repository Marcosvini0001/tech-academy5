import express from "express";
import { getAll } from "../controllers/formaPagamento";

const router = express.Router();

router.get("/formapagamento", getAll);

export default router;
