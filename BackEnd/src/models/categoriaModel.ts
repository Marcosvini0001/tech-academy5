import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class CategoriaModel extends Model {
  id: number | undefined;
  nome: string | undefined;
}

CategoriaModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CategoriaModel",
    tableName: "categorias",
  }
);

export default CategoriaModel;
export { CategoriaModel };