import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class BarberModel extends Model {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  senha: string | undefined;
  funcao: string | undefined;
}

BarberModel.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    funcao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "BarberModel",
    tableName: "barbers",
  }
);

export default BarberModel;
