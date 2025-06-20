import { Request, Response } from "express";
import PagamentoModel from "../models/pagamentoModel";

export const getAll = async (req: Request, res: Response) => {
  const pagamentos = await PagamentoModel.findAll();
  res.send(pagamentos);
};
