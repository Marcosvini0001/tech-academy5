import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class PrecoModel extends Model {
  id: number | undefined;
  valor: number | undefined;
  produtoId: number | undefined;
}

PrecoModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PrecoModel",
    tableName: "precos",
  }
);

export default PrecoModel;
