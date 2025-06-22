  import { DataTypes, Model } from "sequelize";
  import sequelize from "../config/database";

  class Suporte extends Model {
    public id!: number;
    public assunto!: string;
    public mensagem!: string;
    public userEmail!: string;
  }

  Suporte.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      assunto: { type: DataTypes.STRING, allowNull: false },
      mensagem: { type: DataTypes.TEXT, allowNull: false },
      userEmail: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: "Suporte" }
  );

  export default Suporte;