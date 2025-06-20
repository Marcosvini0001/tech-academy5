import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import CategoriaModel from "../models/categoriaModel";
import PrecoModel from "../models/precoModel";

class ProdutoModel extends Model {
  id: number | undefined;
  name: string | undefined;
  marca: string | undefined;
  descricao: string | undefined;
  categoriaId: number | undefined;
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
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProdutoModel",
    tableName: "produtos",
  }
);

ProdutoModel.belongsTo(CategoriaModel, { foreignKey: "categoriaId", as: "categoria" });
ProdutoModel.hasOne(PrecoModel, { foreignKey: "produtoId", as: "preco" });
export { ProdutoModel };