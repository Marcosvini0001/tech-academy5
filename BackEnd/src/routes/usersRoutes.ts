import express from "express";
import {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
  updateUserAddress,
} from "../controllers/usersController";

const router = express.Router();

router.get("/users", getAll);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.put("/users/:id/address", updateUserAddress);
router.delete("/users/:id", deleteUserById);

export default router;
