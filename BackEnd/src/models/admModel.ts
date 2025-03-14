import { DataTypes, Model } from "sequelize";
import sequelize from '../config/database';

class AdmModel extends Model {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    senha: string | undefined;
    funcao: string | undefined;
}

AdmModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    funcao: {
        type: DataTypes.STRING,
        allowNull:false
    }
},
{
    sequelize,
    modelName: 'AdmModel',
    tableName: 'adms'
} 
)

export default AdmModel