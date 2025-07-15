'use strict';
const { Model,DataTypes} = require('sequelize');
const sequelize=require("../src/config/database")
  class comentario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comentario.belongsTo(models.publicaciones,{foreignKey:"publicacion_id"})
    }
  }
  comentario.init({
    id:{
      type:DataTypes.BIGINT,
      autoIncrement:true,
      primaryKey:true,
      allowNull:false,      
    },
    publicacion_id:{
      type:DataTypes.BIGINT,
      references:{
        model:"publicaciones",
        key:"id"
      }
    },
    usuario_id:{
      type:DataTypes.BIGINT,
      references:{
        model:"usuario",
        key:"id"
      }
    },
    like_user:{
      type:DataTypes.STRING
    },
    tipo:{
      type:DataTypes.STRING
    },
    comentario:{
      type: DataTypes.TEXT
    }  
    }, {
    sequelize,
    timestamps:false,
    modelName: 'comentario',
  });
module.exports=comentario
