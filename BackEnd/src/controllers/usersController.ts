import { Request, Response } from "express";
import UserModel from "../models/usersModel";
import "../routes/usersRoutes";
import bcrypt from "bcryptjs";

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
  const { name, email, password, endereco, cpf, cep } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      endereco,
      cpf,
      cep,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao registrar usuário." });
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<any> => {
  try {
    const { name, email, password, endereco, cpf, cep } = req.body;

    if (!name || !email || !password || !endereco || !cpf || !cep) {
      return res.status(400).json({ error: "Valor invalido" });
    }

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário nao encontrado" });
    }

    user.name = name;
    user.email = email;
    user.endereco = endereco;
    user.cpf = cpf;
    user.cep = cep;

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
