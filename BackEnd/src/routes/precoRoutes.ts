import express from "express";
import * as precoController from "../controllers/precoController";

const router = express.Router();

router.get("/precos", precoController.getAllPrecos);
router.get("/precos/:id", precoController.getPrecoById);
router.post("/precos", precoController.createPreco);
router.put("/precos/:id", precoController.updatePreco);
router.delete("/precos/:id", precoController.deletePreco);

export default router;
