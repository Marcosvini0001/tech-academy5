import { Request, Response, } from "express";
import formaPagamentoModel from "../models/formaPagamentoModel";
import itemPmodel from "../models/itemPModel";

export const processPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Dados recebidos no backend:", req.body);

    const { tipoPagamento, produto, parcelas, userId } = req.body;

    if (!tipoPagamento || !produto || !produto.id || !produto.preco || !userId) {
      res.status(400).json({ error: "Dados incompletos ou inválidos." });
      return;
    }

    const pagamento = await formaPagamentoModel.create({
      tipo_pagamento: tipoPagamento,
    });

    console.log("Pagamento criado com ID:", pagamento.id_forma_pagamento);


    await itemPmodel.create({
      id_pedido: pagamento.id_forma_pagamento,
      id_produto: produto.id,
      id_usuario: userId,
      quantidade: 1, 
      preco_unitario: produto.preco,
      precoCompra: produto.preco,
    });

    res.status(201).json({ message: "Pagamento processado com sucesso." });
  } catch (error) {
    console.error("Erro ao processar pagamento:", error); 
    res.status(500).json({ error: "Erro interno no servidor.", details: (error as Error).message });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const formaPagamento = await formaPagamentoModel.findAll();
  res.send(formaPagamento);
};


export const processBulkPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Dados de compra em lote recebidos:", req.body);
    const { pedidos } = req.body;

    if (!pedidos || !Array.isArray(pedidos) || pedidos.length === 0) {
      res.status(400).json({ error: "Formato de pedidos inválido" });
      return;
    }

  
    const tipoPagamento = pedidos[0].tipoPagamento;
    const pagamento = await formaPagamentoModel.create({
      tipo_pagamento: tipoPagamento,
    });

    console.log("Pagamento em lote criado com ID:", pagamento.id_forma_pagamento);

    for (const pedido of pedidos) {
      const { produto, userId } = pedido;
      
      if (!produto || !produto.id || !userId) {
        console.warn("Pulando item com dados incompletos:", pedido);
        continue;
      }

      await itemPmodel.create({
        id_pedido: pagamento.id_forma_pagamento,
        id_produto: produto.id,
        id_usuario: userId,
        quantidade: produto.quantidade || 1,
        preco_unitario: produto.preco,
        precoCompra: String(produto.preco * (produto.quantidade || 1)),
      });
    }

    res.status(201).json({ message: "Compra processada com sucesso." });
  } catch (error) {
    console.error("Erro ao processar compra em lote:", error);
    res.status(500).json({ error: "Erro interno no servidor.", details: (error as Error).message });
  }
};
