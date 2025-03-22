import { Request, Response } from "express";
import formaPagamentoModel from "../models/fomaPagamento";

export const getAll = async (req: Request, res: Response) => {
  const formaPagamento = await formaPagamentoModel.findAll();
  res.send(formaPagamento);
};
