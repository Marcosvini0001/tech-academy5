import express from "express";
import { getAll } from "../controllers/pagamentoController";

const router = express.Router();

router.get("/", getAll);

export default router;
