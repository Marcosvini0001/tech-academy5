import { Router } from "express";
import CategoriaController from "../controllers/categoriaController";

const router = Router();

router.post("/", async (req, res) => {
  try {
    await CategoriaController.create(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    await CategoriaController.findAll(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    await CategoriaController.update(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await CategoriaController.delete(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
