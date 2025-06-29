'use strict';
const {Model,DataTypes} = require('sequelize');
const sequelize=require("../src/config/database")
  class likes_publicacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      likes_publicacion.belongsTo(models.publicaciones,{foreignKey:"publicacion_id"})
      //likes_publicacion.belongsTo(models.usuario,{foreignKey:"usuario_id"})

    }
  }
  likes_publicacion.init({
    id:{
      type:DataTypes.BIGINT,
      autoIncrement:true,
      allowNull:false,
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
    tipo_reaccion: DataTypes.STRING,
    publicacion_id: {
     type:DataTypes.BIGINT,
     allowNull:false,
     references:{
      model:"publicaciones",
      key:"id"
     }
      
    },
    fecha: DataTypes.DATE
  }, {
    sequelize,
    timestamps:false,
    modelName: 'likes_publicacion',
  });

module.exports=likes_publicacion