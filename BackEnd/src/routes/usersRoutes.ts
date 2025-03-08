import express from "express";
import { getAll, createUser } from "../controllers/usersController";

const router = express.Router();

router.get("/users", getAll);
router.post("/user", createUser);

export default router;
