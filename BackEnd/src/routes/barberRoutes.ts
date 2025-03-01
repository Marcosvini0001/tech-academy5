import express from "express";
import {
  getAll,
  getBarberById,
  createBarber,
  updateBarber,
} from "../controllers/barberController";

const router = express.Router();

router.get("/barbers", getAll);
router.get("/barbers/:id", getBarberById);
router.post("/barbers", createBarber);
router.put("/barbers/:id", updateBarber);

export default router;
