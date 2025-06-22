import { Request, Response } from "express";
import CartItem from "../models/cartModel";
import { ProdutoModel } from "../models/produtoModel";

export const getCart = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;
  const items = await CartItem.findAll({
    where: { userId },
    include: [{ model: ProdutoModel, as: "produto" }]
  });
  res.json(items);
};

export const addToCart = async (req: Request, res: Response): Promise<any> => {
  const { userId, produtoId, quantidade } = req.body;
  let item = await CartItem.findOne({ where: { userId, produtoId } });
  if (item) {
    item.quantidade += quantidade || 1;
    await item.save();
    return res.json(item);
  }
  item = await CartItem.create({ userId, produtoId, quantidade: quantidade || 1 });
  res.status(201).json(item);
};

export const updateCartItem = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { quantidade } = req.body;
  const item = await CartItem.findByPk(id);
  if (!item) return res.status(404).json({ error: "Item não encontrado" });
  item.quantidade = quantidade;
  await item.save();
  res.json(item);
};

export const deleteCartItem = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const item = await CartItem.findByPk(id);
  if (!item) return res.status(404).json({ error: "Item não encontrado" });
  await item.destroy();
  res.status(204).send();
};