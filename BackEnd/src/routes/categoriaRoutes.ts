import { Router } from "express";
import CategoriaController from "../controllers/categoriaController";

const router = Router();

router.post("/", CategoriaController.create);
router.get("/", CategoriaController.findAll);
router.put("/:id", CategoriaController.update);
router.delete("/:id", CategoriaController.delete);

export default router;
