import { Request, Response } from "express";

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}
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
    if (!name || !email || !password || !endereco || !cpf || !cep) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      return res
        .status(400)
        .json({ error: "CPF inválido. Deve conter 11 dígitos." });
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.",
      });
    }

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
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

export const updateUser = async (
  req: AuthenticatedRequest & { params: { id: string } },
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

    if (!req.user || req.user.id !== String(user.id)) {
      return res
        .status(403)
        .json({ error: "You can only edit your own data." });
    }

    if (email && email !== user.email) {
      return res.status(400).json({ error: "Email cannot be changed." });
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

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cpf } = req.body;

    if (!name || !email || !password || !cpf) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Formato de e-mail inválido." });
    }

    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      return res
        .status(400)
        .json({ error: "CPF inválido. Deve conter 11 dígitos." });
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.",
      });
    }

    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      cpf,
    });

    res
      .status(201)
      .json({ message: "Usuário registrado com sucesso.", user: newUser });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
