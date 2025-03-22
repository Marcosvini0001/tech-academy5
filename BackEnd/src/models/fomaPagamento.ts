import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class FormaPagamentoModel extends Model {
  id_forma_pagamento: number | undefined;
  tipo_pagamento: string | undefined;
}

FormaPagamentoModel.init(
  {
    id_forma_pagamento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    tipo_pagamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "FormaPagamentoModel",
    tableName: "formapagamento",
  }
);

export default FormaPagamentoModel;
