import { Request, Response, } from "express";
import formaPagamentoModel from "../models/formaPagamentoModel";
import itemPmodel from "../models/itemPModel";

export const processPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Dados recebidos no backend:", req.body);

    const { tipoPagamento, produto, parcelas, userId } = req.body;

    // Validação dos dados recebidos
    if (!tipoPagamento || !produto || !produto.id || !produto.preco || !userId) {
      res.status(400).json({ error: "Dados incompletos ou inválidos." });
      return;
    }

    // Cria o registro na tabela `formapagamento`
    const pagamento = await formaPagamentoModel.create({
      tipo_pagamento: tipoPagamento,
    });

    console.log("Pagamento criado com ID:", pagamento.id_forma_pagamento);

    // Usa o `id_forma_pagamento` gerado como `id_pedido`
    await itemPmodel.create({
      id_pedido: pagamento.id_forma_pagamento,
      id_produto: produto.id,
      id_usuario: userId,
      quantidade: 1, // Certifique-se de que a quantidade é válida
      preco_unitario: produto.preco,
      precoCompra: produto.preco,
    });

    res.status(201).json({ message: "Pagamento processado com sucesso." });
  } catch (error) {
    console.error("Erro ao processar pagamento:", error); // Exibe o erro completo
    res.status(500).json({ error: "Erro interno no servidor.", details: (error as Error).message });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const formaPagamento = await formaPagamentoModel.findAll();
  res.send(formaPagamento);
};
