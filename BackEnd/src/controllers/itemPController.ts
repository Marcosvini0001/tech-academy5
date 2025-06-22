import itemPmodel from "../models/itemPModel";
import { Request, Response, NextFunction } from "express";
import ItemPedido from '../models/itemPModel'; 
import UserModel from "../models/usersModel";

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

export const createitemP = async (req: Request, res: Response): Promise<any> => {
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
    const { preco_unitario, precoCompra } = req.body;

    if (!precoCompra || !preco_unitario) {
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

export const getItemsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const items = await itemPmodel.findAll({
      where: { id_usuario: userId },
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar itens do usuário." });
  }
};

export const getUserPurchases = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    console.log("Buscando pedidos para o usuário:", userId); 
    const purchases = await itemPmodel.findAll({
      where: { id_usuario: userId },
    });

    if (!purchases || purchases.length === 0) {
      res.status(404).json({ error: "Nenhum pedido encontrado para este usuário." });
      return;
    }

    res.status(200).json(purchases);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    res.status(500).json({ error: "Erro ao buscar pedidos." });
  }
};

export const updateDeliveryAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id_item_pedido } = req.params;
  const { userId } = req.body; 

  try {
    const item = await itemPmodel.findByPk(id_item_pedido);

    if (!item) {
      res.status(404).json({ error: "Pedido não encontrado." });
      return;
    }

    const user = await UserModel.findByPk(userId);

    if (!user || !user.endereco) {
      res.status(404).json({ error: "Usuário ou endereço não encontrado." });
      return;
    }


    item.enderecoEntrega = user.endereco; 
    await item.save();

    res.status(200).json({ message: "Endereço atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar endereço:", error);
    next(error); 
  }
};

export const cancelOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id_item_pedido = parseInt(req.params.id_item_pedido, 10);

    if (isNaN(id_item_pedido)) {
      res.status(400).json({ error: "ID inválido." });
      return;
    }

    const item = await itemPmodel.findByPk(id_item_pedido);

    if (!item) {
      res.status(404).json({ error: "Pedido não encontrado." });
      return;
    }


    await item.destroy();

    res.status(200).send({ message: "Pedido cancelado com sucesso." });
  } catch (error) {
    console.error("Erro ao cancelar pedido:", error);
    next(error);
  }
};

export const getCompras = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;


    const compras = await ItemPedido.findAll({ where: { id_usuario: id } });

    if (!compras) {
      res.status(404).json({ error: 'Nenhuma compra encontrada.' });
      return;
    }

    res.status(200).json(compras);
  } catch (error) {
    console.error('Erro ao buscar compras:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};

