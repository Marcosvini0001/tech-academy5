import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

const secret = "123456"; 
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, secret);
    (req as Request & { user?: CustomJwtPayload }).user = decoded as CustomJwtPayload; 
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido." });
  }
};