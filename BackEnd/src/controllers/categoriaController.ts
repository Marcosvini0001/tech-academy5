import { Request, Response } from "express";
import CategoriaModel from "../models/categoriaModel";

const CategoriaController = {
  create: async (req: Request, res: Response) => {
    try {
      const { nome } = req.body;
      if (!nome) {
        return res.status(400).json({ error: "Nome é obrigatório." });
      }

      const categoria = await CategoriaModel.create({ nome });
      return res.status(201).json(categoria);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar categoria", details: error });
    }
  },

  findAll: async (_req: Request, res: Response) => {
    try {
      const categorias = await CategoriaModel.findAll();
      return res.json(categorias);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar categorias", details: error });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      const categoria = await CategoriaModel.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }

      categoria.nome = nome;
      await categoria.save();
      return res.json(categoria);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar categoria", details: error });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const categoria = await CategoriaModel.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }

      await categoria.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao excluir categoria", details: error });
    }
  },
};

export default CategoriaController;
