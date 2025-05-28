'use strict';
const {
  Model,DataTypes
} = require('sequelize');
const sequelize=require("../src/config/database")
  class actividades_diarias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      actividades_diarias.belongsTo(models.usuario,{foreignKey:'usuario_id'})
    }
  }
  actividades_diarias.init({    
    id:{
      type:DataTypes.BIGINT,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
    },
    imagen:DataTypes.STRING,
    usuario_id: {
      type:DataTypes.BIGINT,
      allowNull:false,
     
      references:{
        model:'usuario',
        key:'id'
      }
    },
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'actividades_diarias',
    timestamps:false,
    freezeTableName:true
  });
module.exports=actividades_diarias