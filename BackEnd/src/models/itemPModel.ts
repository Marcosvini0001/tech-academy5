import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class itemPmodel extends Model {
  id_item_pedido: number | undefined;
  id_pedido: number | undefined;
  id_produto: number | undefined;
  id_usuario: number | undefined;
  quantidade: number | undefined;
  precoCompra: string | undefined;
  preco_unitario: number | undefined;
}

itemPmodel.init(
  {
    id_item_pedido: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false, // Campo obrigatório
    },
    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    preco_unitario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precoCompra: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "itemPModel",
    tableName: "itemP",
  }
);

export default itemPmodel;