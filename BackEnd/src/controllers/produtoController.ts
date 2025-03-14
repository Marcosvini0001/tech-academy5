import { Request, Response } from "express";
import ProdutoModel from "../models/produtoModel";

export const getAll = async (req: Request, res: Response) => {
  const produtos = await ProdutoModel.findAll();
  res.send(produtos);
};
