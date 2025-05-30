import { Router } from "express";
import CategoriaController from "../controllers/categoriaController";

const router = Router();

router.post("/categorias", CategoriaController.create);
router.get("/categorias", CategoriaController.findAll);
router.put("/categorias/:id", CategoriaController.update);
router.delete("/categorias/:id", CategoriaController.delete);

export default router;
