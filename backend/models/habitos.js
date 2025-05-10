'use strict';
const { Model,DataTypes} = require('sequelize');
const sequelize=require("../src/config/database")

  class habitos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      habitos.belongsTo(models.usuario,{foreignKey:'usuario_id'})
      habitos.hasMany(models.registros_habitos,{foreignKey:'habito_id'})
    }
  }
  habitos.init({
    id:{
      type:DataTypes.BIGINT,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
    },
    usuario_id:{
      type:DataTypes.BIGINT,
      allowNull:false,
      references:{
        model:'usuario',
        key:'id'
      }
    },
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    frecuencia: DataTypes.STRING,
    activo: DataTypes.BOOLEAN,
    fecha_inicio:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'habitos',
    freezeTableName:true,
    timestamps:false
  }); 
module.exports=habitos