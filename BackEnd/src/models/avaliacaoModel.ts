import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class AvaliacaoModel extends Model {
  id!: number;
  id_usuario!: number;
  id_produto!: number;
  nota!: number;
  comentario!: string;
}

AvaliacaoModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false },
    id_produto: { type: DataTypes.INTEGER, allowNull: false },
    nota: { type: DataTypes.INTEGER, allowNull: false }, // 1 a 5
    comentario: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "AvaliacaoModel",
    tableName: "avaliacoes",
  }
);

export default AvaliacaoModel;