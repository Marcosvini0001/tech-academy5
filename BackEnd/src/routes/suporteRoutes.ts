import { Router } from "express";
import {
  createSuporte,
  getAllSuportes,
  getSuporteById,
  updateSuporte,
  deleteSuporte,
  getSuportesByEmail,
} from "../controllers/suporteController";

const router = Router();

router.post("/", createSuporte);
router.get("/", getAllSuportes);
router.get("/:id", getSuporteById);
router.put("/:id", updateSuporte);
router.delete("/:id", deleteSuporte);
router.get("/user/:email", getSuportesByEmail);

export default router;