'use strict';
const { Model,DataTypes} = require('sequelize');
const sequelize=require("../src/config/database")

  class noti extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
      noti.belongsTo(models.usuario,{foreignKey:"usuario_id"})
    }
  }
  noti.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT
      },
    tipo: DataTypes.STRING,
    contenido_id:DataTypes.STRING,    
    mensaje:DataTypes.STRING,
    hora: DataTypes.DATE,    
    emisor_id:DataTypes.BIGINT,
    usuario_id:{
     type:DataTypes.BIGINT,
           allowNull:false,
           references:{
             model:'usuario',
             key:'id'
           }
    }
  }, {
    sequelize,
    timestamps:false,    
    modelName: 'noti',
  });
module.exports=noti