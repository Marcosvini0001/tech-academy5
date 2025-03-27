import express, { Router, Request, Response} from "express";
import { RequestHandler } from "express";
import UserModel from "../models/usersModel";
import bcrypt from "bcrypt";

const loginHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
      }
  
      const user = await UserModel.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
  
      const senhaCorreta = await bcrypt.compare(password, user.password);
  
      if (!senhaCorreta) {
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
      console.error("Erro no login:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  };
