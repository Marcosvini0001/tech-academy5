import express from "express";
import {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
} from "../controllers/usersController";

const router = express.Router();

router.get("/users", getAll);

export default router;
