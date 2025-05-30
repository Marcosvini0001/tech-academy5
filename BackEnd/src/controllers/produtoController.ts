import { Request, Response } from "express";
import ProdutoModel from "../models/produtoModel";
import CategoriaModel from "../models/categoriaModel";
import PrecoModel from "../models/precoModel";

export const getAll = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  const produtos = await ProdutoModel.findAndCountAll({
    limit: Number(limit),
    offset,
    include: [CategoriaModel, PrecoModel],
  });

  res.json({
    total: produtos.count,
    pages: Math.ceil(produtos.count / Number(limit)),
    data: produtos.rows,
  });
};

export const getProdutoById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const produto = await ProdutoModel.findByPk(req.params.id, {
    include: [CategoriaModel, PrecoModel],
  });

  return res.json(produto);
};

export const createProduto = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, marca, descricao, categoriaId, precoValor } = req.body;

    if (!name || !marca || !descricao || !categoriaId || !precoValor) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const produto = await ProdutoModel.create({
      name,
      marca,
      descricao,
      categoriaId,
    });

    await PrecoModel.create({
      valor: precoValor,
      produtoId: produto.id,
    });

    const produtoCompleto = await ProdutoModel.findByPk(produto.id, {
      include: [CategoriaModel, PrecoModel],
    });

    return res.status(201).json(produtoCompleto);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const updateProduto = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<any> => {
  try {
    const { name, descricao, precoValor } = req.body;

    if (!name || !descricao || !precoValor) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const produto = await ProdutoModel.findByPk(req.params.id, {
      include: [PrecoModel],
    });

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    produto.name = name;
    produto.descricao = descricao;
    await produto.save();

    if (produto.preco) {
      produto.preco.valor = precoValor;
      await produto.preco.save();
    } else {
      await PrecoModel.create({ valor: precoValor, produtoId: produto.id });
    }

    const produtoAtualizado = await ProdutoModel.findByPk(produto.id, {
      include: [CategoriaModel, PrecoModel],
    });

    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const deleteProduto = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const produto = await ProdutoModel.findByPk(id);

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    await PrecoModel.destroy({ where: { produtoId: produto.id } });
    await produto.destroy();

    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};
