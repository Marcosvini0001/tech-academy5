import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class ProdutoModel extends Model {
  id: number | undefined;
  name: string | undefined;
  categoria: string | undefined;
  marca: string | undefined;
  estoque: string | undefined;
  preco: number | undefined;
  descricao: string | undefined;
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
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estoque: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
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

export default ProdutoModel;
