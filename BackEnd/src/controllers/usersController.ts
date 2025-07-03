import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/usersModel";

export const getAll = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  const users = await User.findAndCountAll({
    limit: Number(limit),
    offset,
  });

  res.json({
    total: users.count,
    pages: Math.ceil(users.count / Number(limit)),
    data: users.rows,
  });
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const user = await User.findByPk(req.params.id);

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

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
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
  req: Request & { user?: { id: string }, params: { id: string } },
  res: Response
): Promise<any> => {
  try {
    const { name, email, password, endereco, cpf, cep } = req.body;

    if (!name || !email || !password || !endereco || !cpf || !cep) {
      return res.status(400).json({ error: "Valor invalido" });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário nao encontrado" });
    }

    if (!req.user || req.user.id !== String(user.id)) {
      return res
        .status(403)
        .json({ error: "Você só pode editar seus próprios dados." });
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
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await user.destroy();
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const registerUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password, endereco, cpf, cep, role } = req.body;

    // Verifica se já existe usuário com o mesmo email ou cpf
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    const existingCpf = await User.findOne({ where: { cpf } });
    if (existingCpf) {
      return res.status(400).json({ message: "CPF já cadastrado." });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Só permite criar admin se for o primeiro usuário
    const userCount = await User.count();
    let userRole = "user";
    if (userCount === 0 && role === "admin") {
      userRole = "admin";
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      endereco,
      cpf,
      cep,
      role: userRole,
    });

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário.", error });
  }
};

type UserInstance = typeof User.prototype;

const validatePassword = async (user: UserInstance, senha: string): Promise<boolean> => {
  return bcrypt.compare(senha, user.password);
};

const findUserById = async (id: string): Promise<UserInstance | null> => {
  return User.findByPk(id);
};

export const updateUserAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { endereco, senha } = req.body;

    if (!endereco || !senha) {
      res.status(400).json({ error: "O endereço e a senha são obrigatórios." });
      return;
    }

    const user = await findUserById(id);
    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado." });
      return;
    }

    const isPasswordValid = await validatePassword(user, senha);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Senha incorreta." });
      return;
    }

    user.endereco = endereco;
    await user.save();

    res.status(200).json({ message: "Endereço atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar endereço:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};