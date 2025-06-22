'use strict';
const { Model,DataTypes} = require('sequelize');
const sequelize=require("../src/config/database")

  class Seguidores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
    }
  }
  Seguidores.init({
    id: {
      type:DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    seguidor_id: {
     type: DataTypes.BIGINT,
     allowNull:true,
     references:{
      model:"usuario",
      key:"id"
     }
     
    },
    seguido_id: {
     type: DataTypes.BIGINT,
     allowNull:true,
     references:{
      model:"usuario",
      key:"id"
     }
      
    },
    fecha: DataTypes.DATE,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    timestamps:false,
    modelName: 'seguidores',
    freezeTableName:true
  });
 
module.exports=Seguidores
