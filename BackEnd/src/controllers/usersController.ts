import { Request, Response } from "express";
import UserModel from "../models/usersModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, senha } = req.body;

    if (!name || !email || !senha) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const user = await UserModel.create({ name, email, senha });
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, senha } = req.body;

    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.senha = senha || user.senha;

    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await user.destroy();
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};
