import { Router } from "express";
import {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
  updateUserAddress,
  registerUser, 
} from "../controllers/usersController";
import { loginUser } from "../controllers/loginController";

const router = Router();

router.get("/", getAll);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.put("/:id/address", updateUserAddress);
router.delete("/:id", deleteUserById);
router.post("/login", loginUser); // Rota para login
router.post('/register', registerUser); 


export default router;
