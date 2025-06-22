import { Request, Response } from "express";
import { ProdutoModel } from "../models/produtoModel";
import { PrecoModel } from "../models/precoModel";
import { isAxiosError } from "axios";

export const getAll = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const produtos = await ProdutoModel.findAndCountAll({
      limit: Number(limit),
      offset,
      include: [{ model: PrecoModel, as: "preco" }],
    });

    console.log("Produtos retornados:", produtos.rows); // Adicione este log
    res.status(200).json({ data: produtos.rows, total: produtos.count });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos", details: error });
  }
};

export const getProdutoById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const produto = await ProdutoModel.findByPk(req.params.id, {
      include: [
        { model: PrecoModel, as: "preco" }
      ],
    });

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    return res.json(produto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto", details: error });
  }
};

export const createProduto = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, marca, descricao, precoValor } = req.body;
    console.log("Dados recebidos:", { name, marca, descricao, precoValor });

    if (!name || !marca || !descricao || !precoValor) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const produto = await ProdutoModel.create({
      name,
      marca,
      descricao,
    });

    console.log("Produto criado:", produto);

    const preco = await PrecoModel.create({
      valor: Number(precoValor),
      produtoId: produto.id,
    });

    console.log("Preço criado:", preco);

    // Retornar o produto completo com o preço
    const produtoCompleto = await ProdutoModel.findByPk(produto.id, {
      include: [{ model: PrecoModel, as: "preco" }],
    });

    res.status(201).json(produtoCompleto);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
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
      include: [{ model: PrecoModel, as: "preco" }],
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
      include: [
        { model: PrecoModel, as: "preco" }
      ],
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

