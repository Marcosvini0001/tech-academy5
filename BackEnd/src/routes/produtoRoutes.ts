import express from "express";
import { getAll } from "../controllers/produtoController";

const router = express.Router();

router.get("/produtos", getAll);

export default router;
