'use strict';
const { Model,DataTypes} = require('sequelize');
const sequelize=require("../src/config/database")

  class metas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      metas.belongsTo(models.usuario,{foreignKey:'usuario_id'})
    }
  }
  metas.init({    
    usuario_id: {
      type: DataTypes.BIGINT,
      allowNull:false,
      references:{
        model:'usuario',
        key:'id'
      }
    },
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    proceso: DataTypes.INTEGER,
    meta_total: DataTypes.INTEGER,
    fecha_limite: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'metas',
    timestamps:false,
    freezeTableName:true,
  });
 module.exports=metas
