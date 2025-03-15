import { Request, Response } from "express";
import UserModel from "../models/usersModel";
import "../routes/usersRoutes";

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const user = await UserModel.findByPk(req.params.id);

  return res.json(user);
};

export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, senha, cpf } = req.body;

    if (!name || !email || !senha || !cpf) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const user = await UserModel.create({ name, email, senha, cpf });
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    const loggedUser = req.body.user;
    console.log("logged", loggedUser);

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Values required" });
    }

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name;
    user.email = email;

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
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
