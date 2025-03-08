import { Request, Response } from "express";
import barberModel from "../models/barberModels";

// método que busca todos
export const getAll = async (req: Request, res: Response) => {
  const adms = await barberModel.findAll();
  res.send(adms);
};
