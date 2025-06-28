'use strict';
const {
  Model,DataTypes
} = require("sequelize");
const sequelize=require("../src/config/database")
  class publicaciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      publicaciones.belongsTo(models.usuario,{foreignKey:"usuario_id"})
      // define association here
    }
  }
  publicaciones.init({
    id:{
      type:DataTypes.BIGINT,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
      },
    usuario_id: {
      type:DataTypes.BIGINT,
      allowNull:false,
      references:{
        model:"usuario",
        key:"id"
      }      
    },
    contenido_id: DataTypes.BIGINT,
    tipo: DataTypes.STRING,
    creacion: DataTypes.DATE
  }, {
    sequelize,
    timestamps:false,
    modelName: 'publicaciones',
  });
module.exports=publicaciones