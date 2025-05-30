import { Request, Response } from "express";
import PrecoModel from "../models/precoModel";
import ProdutoModel from "../models/produtoModel";

const PrecoController = {
  async create(req: Request, res: Response) {
    try {
      const { valor, produtoId } = req.body;

      const produto = await ProdutoModel.findByPk(produtoId);
      if (!produto) return res.status(404).json({ message: "Produto não encontrado" });

      const preco = await PrecoModel.create({ valor, produtoId });
      return res.status(201).json(preco);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar preço", error });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const precos = await PrecoModel.findAll();
      return res.json(precos);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao listar preços", error });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { valor } = req.body;

      const preco = await PrecoModel.findByPk(id);
      if (!preco) return res.status(404).json({ message: "Preço não encontrado" });

      preco.valor = valor;
      await preco.save();

      return res.json(preco);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar preço", error });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const preco = await PrecoModel.findByPk(id);

      if (!preco) return res.status(404).json({ message: "Preço não encontrado" });

      await preco.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao excluir preço", error });
    }
  },
};

export default PrecoController;
