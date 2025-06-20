import { Router } from "express";
import {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
  updateUserAddress,
} from "../controllers/usersController";

const router = Router();

router.get("/", getAll);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.put("/:id/address", updateUserAddress);
router.delete("/:id", deleteUserById);

export default router;
