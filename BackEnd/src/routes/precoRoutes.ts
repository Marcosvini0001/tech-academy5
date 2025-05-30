import { Router } from "express";
import PrecoController from "../controllers/precoController";

const router = Router();

router.post("/", PrecoController.create);
router.get("/", PrecoController.findAll);
router.put("/:id", PrecoController.update);
router.delete("/:id", PrecoController.delete);

export default router;
