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
      usuario.hasMany(models.habitos,{foreignKey:'usuario_id'})
      usuario.hasMany(models.metas,{foreignKey:'usuario_id'})
      usuario.hasMany(models.actividades_diarias,{foreignKey:'usuario_id'})
      usuario.hasMany(models.emociones,{foreignKey:"usuario_id"})
      usuario.hasMany(models.logros,{foreignKey:"usuario_id"})
      usuario.hasMany(models.noti,{foreignKey:"usuario_id"})
      usuario.belongsToMany(models.usuario,{as:"seguidos",through:models.seguidores,foreignKey:"seguidor_id",otherKey:"seguido_id"})
      usuario.belongsToMany(models.usuario,{as:"seguidores",through:models.seguidores,foreignKey:"seguido_id",otherKey:"seguidor_id"})
      usuario.hasMany(models.publicaciones,{foreignKey:"usuario_id"})
      //usuario.hasMany(models.likes_publicacion,{foreignKey:"usuario_id"})
    }
  }
  usuario.init({
    id:{
     type:DataTypes.BIGINT,
     allowNull:false,
     primaryKey:true,
     autoIncrement:true
    },
    imagen:DataTypes.STRING,
    nombre:DataTypes.STRING,
    apellido: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    pass:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'usuario',
    timestamps:false,
    freezeTableName:true
  });
module.exports=usuario  
