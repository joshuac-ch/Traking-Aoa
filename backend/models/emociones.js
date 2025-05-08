'use strict';
const {
  Model,DataTypes
} = require('sequelize');
const sequelize=require("../src/config/database")
  class emociones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      emociones.belongsTo(models.usuario,{foreignKey:'usuario_id'})
    }
  }
  emociones.init({
    id: {
      type:DataTypes.BIGINT,
      allowNull:false,
      autoIncrement:true    
    },
    usuario_id: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'usuario',
        key:'id'
      }
    },
    emocion: DataTypes.STRING,
    nivel: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    comentario: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'emociones',
    timestamps:false,
    freezeTableName:true
  });
module.exports=emociones;
