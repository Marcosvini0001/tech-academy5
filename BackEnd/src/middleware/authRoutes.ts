import express from "express";
import userRoutes from "../routes/usersRoutes";
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Rotas
app.use("/users", userRoutes);

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res
            .status(401)
            .json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded; // Attach the decoded user to the request object
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};

export default app;