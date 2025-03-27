import { Request, Response } from "express";
import ProdutoModel from "../models/produtoModel";

export const getAll = async (req: Request, res: Response) => {
  const produtos = await ProdutoModel.findAll();
  res.send(produtos);
};

export const getProdutoById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const produto = await ProdutoModel.findByPk(req.params.id);

  return res.json(produto);
};

export const createProduto = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, categoria, marca, preco, descricao } = req.body;

    if (!name || !categoria || !marca || !preco || !descricao) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const user = await ProdutoModel.create({
      name,
      categoria,
      marca,
      preco,
      descricao,
    });
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const updateProduto = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<any> => {
  try {
    const { name, preco, descricao } = req.body;

    if (!name || !preco || !descricao) {
      return res.status(400).json({ error: "Values required" });
    }

    const produto = await ProdutoModel.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: "produto not found" });
    }

    produto.name = name;
    produto.preco = preco;
    produto.descricao = descricao;

    await produto.save();
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
