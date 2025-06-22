import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { ProdutoModel } from "./produtoModel";


class CartItem extends Model {
  public id!: number;
  public userId!: number;
  public produtoId!: number;
  public quantidade!: number;
}

CartItem.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    produtoId: { type: DataTypes.INTEGER, allowNull: false },
    quantidade: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  },
  { sequelize, modelName: "CartItem", tableName: "cart_items" }
);
CartItem.belongsTo(ProdutoModel, { foreignKey: "produtoId", as: "produto" });


export default CartItem;