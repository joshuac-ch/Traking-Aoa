'use strict';
const { Model,DataTypes } = require('sequelize');
const sequelize=require("../src/config/database")
  class logros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      logros.belongsTo(models.usuario,{foreignKey:"usuario_id"})
    }
  }
  logros.init({
    id:{
      type:DataTypes. BIGINT,
      primaryKey:true,
      allowNull:false,
      autoIncrement:true,
    },
    tipo: DataTypes.STRING,
    usuario_id:{
     type: DataTypes.BIGINT
      ,references:{
        model:"usuario",
        key:'id'
      }
    },
    titulo:DataTypes.STRING,
    descripcion:DataTypes.STRING,
    fecha_logro:DataTypes.DATE,
    referencia_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'logros',
  });

  module.exports=logros
