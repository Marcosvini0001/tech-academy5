import express from "express";
import {
  getAll,
  getBarberById,
  createBarber,
  updateBarber,
} from "../controllers/barberController";

const router = express.Router();

router.get("/users", getAll);
router.get("/users/:id", getBarberById);
router.post("/users", createBarber);
router.put("/users/:id", updateBarber);

export default router;
