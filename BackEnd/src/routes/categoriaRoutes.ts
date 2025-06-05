import { Router } from "express";
import CategoriaController from "../controllers/categoriaController";

const router = Router();

router.post("/categorias", async (req, res) => {
  try {
    await CategoriaController.create(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/categorias", async (req, res) => {
  try {
    await CategoriaController.findAll(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/categorias/:id", async (req, res) => {
  try {
	await CategoriaController.update(req, res);
  } catch (error) {
	res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/categorias/:id", async (req, res) => {
  try {
    await CategoriaController.delete(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
