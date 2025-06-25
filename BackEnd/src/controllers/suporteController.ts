import { Request, Response } from "express";
import Suporte from "../models/suporteModel";

export const createSuporte = async (req: Request, res: Response): Promise<any> => {
  try {
    const { assunto, mensagem, user } = req.body;
    if (!user?.email) return res.status(400).json({ error: "Usuário não informado" });
    const suporte = await Suporte.create({ assunto, mensagem, userEmail: user.email });
    res.status(201).json(suporte);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar suporte" });
  }
};

export const getAllSuportes = async (req: Request, res: Response): Promise<any> => {
  try {
    const suportes = await Suporte.findAll({ order: [["createdAt", "DESC"]] });
    res.json(suportes);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar suportes" });
  }
};

export const getSuporteById = async (req: Request, res: Response): Promise<any> => {
  try {
    const suporte = await Suporte.findByPk(req.params.id);
    if (!suporte) return res.status(404).json({ error: "Suporte não encontrado" });
    res.json(suporte);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar suporte" });
  }
};

export const updateSuporte = async (req: Request, res: Response): Promise<any> => {
  try {
    const suporte = await Suporte.findByPk(req.params.id);
    if (!suporte) return res.status(404).json({ error: "Suporte não encontrado" });
    const { assunto, mensagem } = req.body;
    await suporte.update({ assunto, mensagem });
    res.json(suporte);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar suporte" });
  }
};

export const deleteSuporte = async (req: Request, res: Response): Promise<any> => {
  try {
    const suporte = await Suporte.findByPk(req.params.id);
    if (!suporte) return res.status(404).json({ error: "Suporte não encontrado" });
    await suporte.destroy();
    res.json({ message: "Suporte excluído" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir suporte" });
  }
};

export const getSuportesByEmail = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.params;
    
    if (!email) {
      return res.status(400).json({ error: "Email não fornecido" });
    }
    
    const suportes = await Suporte.findAll({ 
      where: { userEmail: email },
      order: [["createdAt", "DESC"]] 
    });
    
    res.json(suportes);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar suportes" });
  }
};