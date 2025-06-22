import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class PagamentoModel extends Model {
  id_pagamento: number | undefined;
  id_pedido: number | undefined;
  data_pagamento: Date | undefined;
  valor_pagamento: number | undefined;
  status_pagamento: string | undefined;
  id_forma_pagamento: number | undefined;
}

PagamentoModel.init(
  {
    id_pagamento: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_pagamento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    valor_pagamento: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status_pagamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_forma_pagamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PagamentoModel",
    tableName: "pagamentos",
  }
);

export default PagamentoModel;
