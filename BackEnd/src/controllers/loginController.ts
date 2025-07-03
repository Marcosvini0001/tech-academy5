import { Request, Response } from "express";
import UserModel from "../models/usersModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      res.status(400).json({ error: "Invalid email format." });
      return;
    }


    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ error: "Invalid password." });
      return;
    }


    const token = generateToken(user);


    res.json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};