import express from "express";
import type { Request, Response } from "express";
import { Router } from "express";
import UserModel from "../models/usersModel";
import bcrypt from "bcrypt";

const router: Router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
        }

        const user = await UserModel.findOne({ where: { email } });

        if (!user) {
            console.error(`Usuário com e-mail ${email} não encontrado`);
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if (!isPasswordCorrect) {
            console.error(`Senha incorreta para o usuário: ${email}`);
            return res.status(401).json({ message: "Senha incorreta" });
        }

        return res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            endereco: user.endereco,
            cpf: user.cpf,
            cep: user.cep,
        });
    } catch (error) {
        console.error("Erro no login:", error instanceof Error ? error.stack : error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
});

export default router;
