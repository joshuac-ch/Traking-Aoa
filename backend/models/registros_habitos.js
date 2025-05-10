'use strict';
const {
  Model,DataTypes
} = require('sequelize');
const sequelize=require("../src/config/database")
  class registros_habitos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      registros_habitos.belongsTo(models.habitos,{foreignKey:'habito_id'})
    }
  }
  registros_habitos.init({
    id: {
     type: DataTypes.BIGINT,
     allowNull:false,
     primaryKey:true,
      autoIncrement:true
    },
    habito_id:{
      type:DataTypes.BIGINT,
      allowNull:false,
      references:{
        model:'habitos',
        key:'id'
      }
    },   
    fecha: DataTypes.DATE,
    completado: DataTypes.BOOLEAN,
    nota: DataTypes.STRING
  }, {
    sequelize,
    timestamps:false,
    freezeTableName:true,
    modelName: 'registros_habitos',
  });
  module.exports=registros_habitos
