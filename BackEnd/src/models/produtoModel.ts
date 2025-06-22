import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import PrecoModel from "../models/precoModel";

class ProdutoModel extends Model {
  id: number | undefined;
  name: string | undefined;
  marca: string | undefined;
  descricao: string | undefined;
  preco: any;
}

ProdutoModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProdutoModel",
    tableName: "produtos",
  }
);

ProdutoModel.hasOne(PrecoModel, { foreignKey: "produtoId", as: "preco" });
export { ProdutoModel };