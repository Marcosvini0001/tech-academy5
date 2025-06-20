import { Router } from "express";
import CategoriaController from "../controllers/categoriaController";

const router = Router();

<<<<<<< HEAD
router.post("/", async (req, res) => {
=======
router.post("/categorias", async (req, res) => {
>>>>>>> 082efb170aa04a841603030106c5a6bd2f859619
  try {
    await CategoriaController.create(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
<<<<<<< HEAD
router.get("/", async (req, res) => {
=======
router.get("/categorias", async (req, res) => {
>>>>>>> 082efb170aa04a841603030106c5a6bd2f859619
  try {
    await CategoriaController.findAll(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
<<<<<<< HEAD
router.put("/:id", async (req, res) => {
  try {
    await CategoriaController.update(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/:id", async (req, res) => {
=======
router.put("/categorias/:id", async (req, res) => {
  try {
	await CategoriaController.update(req, res);
  } catch (error) {
	res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/categorias/:id", async (req, res) => {
>>>>>>> 082efb170aa04a841603030106c5a6bd2f859619
  try {
    await CategoriaController.delete(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
