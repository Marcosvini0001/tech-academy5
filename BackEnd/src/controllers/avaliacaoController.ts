import { Request, Response } from "express";
import AvaliacaoModel from "../models/avaliacaoModel";
import itemPmodel from "../models/itemPModel";

export const createAvaliacao = async (req: Request, res: Response) => {
  const { id_produto, nota, comentario } = req.body;
  const id_usuario = req.body.userId; 

  const compra = await itemPmodel.findOne({
    where: { id_usuario, id_produto },
  });
  if (!compra) {
    return res.status(403).json({ error: "Você só pode avaliar produtos comprados." });
  }

  const avaliacao = await AvaliacaoModel.create({
    id_usuario,
    id_produto,
    nota,
    comentario,
  });
  res.status(201).json(avaliacao);
};

export const getAvaliacoesByProduto = async (req: Request, res: Response) => {
  const { id_produto } = req.params;
  const avaliacoes = await AvaliacaoModel.findAll({ where: { id_produto } });
  res.json(avaliacoes);
};

export const updateAvaliacao = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nota, comentario } = req.body;
  const id_usuario = req.body.userId;

  const avaliacao = await AvaliacaoModel.findByPk(id);
  if (!avaliacao || avaliacao.id_usuario !== id_usuario) {
    return res.status(403).json({ error: "Não autorizado." });
  }
  avaliacao.nota = nota;
  avaliacao.comentario = comentario;
  await avaliacao.save();
  res.json(avaliacao);
};

export const deleteAvaliacao = async (req: Request, res: Response) => {
  const { id } = req.params;
  const id_usuario = req.body.userId;

  const avaliacao = await AvaliacaoModel.findByPk(id);
  if (!avaliacao || avaliacao.id_usuario !== id_usuario) {
    return res.status(403).json({ error: "Não autorizado." });
  }
  await avaliacao.destroy();
  res.status(204).send();
};