import { Request, Response } from "express";
import itemPmodel from "../models/itemPModel";

export const getAll = async (req: Request, res: Response) => {
  const itemP = await itemPmodel.findAll();
  res.send(itemP);
};

export const getitemPById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const itemP = await itemPmodel.findByPk(req.params.id);
  return res.json(itemP);
};

export const createitemP = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { quantidade, preco_unitario, precoCompra } = req.body;

    if (!quantidade || !precoCompra || !preco_unitario) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const itemP = await itemPmodel.create({
      preco_unitario,
      precoCompra,
    });

    return res.status(201).json(itemP);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const updateitemP = async (
  req: Request<{ id_item_pedido: string }>,
  res: Response
): Promise<any> => {
  try {
    const {  preco_unitario, precoCompra } = req.body;

    if ( !precoCompra || !preco_unitario) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const itemP = await itemPmodel.findByPk(req.params.id_item_pedido);
    if (!itemP) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    itemP.preco_unitario = preco_unitario;
    itemP.precoCompra = precoCompra;
    

    await itemP.save();
    res.status(200).json(itemP);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};
