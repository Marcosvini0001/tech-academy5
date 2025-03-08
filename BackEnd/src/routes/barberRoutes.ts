import express from "express";
import { getAll } from "../controllers/barberController";

const router = express.Router();

router.get("/barber", getAll);

export default router;
