'use strict';
const { Model,DataTypes } = require('sequelize');
const sequelize=require('../src/config/database')
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuario.init({
    nombre:DataTypes.STRING,
    apellido: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuario',
  });
module.exports=usuario  
