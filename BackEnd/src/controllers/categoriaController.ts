import { Request, Response } from "express";
import CategoriaModel from "../models/categoriaModel";

const CategoriaController = {
  async create(req: Request, res: Response) {
    try {
      const { nome } = req.body;
      const categoria = await CategoriaModel.create({ nome });
      return res.status(201).json(categoria);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar categoria", error });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const categorias = await CategoriaModel.findAll();
      return res.json(categorias);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao listar categorias", error });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      const categoria = await CategoriaModel.findByPk(id);

      if (!categoria) return res.status(404).json({ message: "Categoria não encontrada" });

      categoria.nome = nome;
      await categoria.save();

      return res.json(categoria);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar categoria", error });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const categoria = await CategoriaModel.findByPk(id);

      if (!categoria) return res.status(404).json({ message: "Categoria não encontrada" });

      await categoria.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao excluir categoria", error });
    }
  },
};

export default CategoriaController;
