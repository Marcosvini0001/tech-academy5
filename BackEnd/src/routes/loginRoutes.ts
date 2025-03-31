import express from "express";
import { loginUser } from "../controllers/loginController";

const router = express.Router();

/**
 * Route for user login
 * Accepts email and password in the request body
 */
router.post("/login", loginUser);

export default router;