import { Request, Response } from "express";
import BarberModel from "../models/barberModels";

export const getAll = async (req: Request, res: Response) => {
  const barbers = await BarberModel.findAll();
  res.send(barbers);
};

export const getBarberById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const barber = await BarberModel.findByPk(req.params.id);

  return res.json(barber);
};

export const createBarber = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const user = await BarberModel.create({ name });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const updateBarber = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name } = req.body;
    if (!name || name === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const barber = await BarberModel.findByPk(req.params.id);
    if (!barber) {
      return res.status(404).json({ error: "User not found" });
    }

    barber.name = name;

    await barber.save();
    res.status(201).json(barber);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
