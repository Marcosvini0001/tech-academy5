import { Request, Response } from "express"
import admModel from "../models/admModel"

// método que busca todos
export const getAll = async (req: Request, res: Response) => {
    const adms = await admModel.findAll()
    res.send(adms)
}