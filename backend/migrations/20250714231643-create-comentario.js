'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comentarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      publicacion_id:{
            type:Sequelize.BIGINT,
            onDelete:"CASCADE",
            references:{
            model:"publicaciones",
            key:"id",
      }
      },
      usuario_id:{
            type:Sequelize.BIGINT,
            references:{
              model:"usuario",
              key:"id"
            }
      },
      like_user:{
            type:Sequelize.STRING
      },
      tipo:{
            type:Sequelize.STRING
      },
      comentario:{
            type: Sequelize.TEXT
      }
        
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comentarios');
  }
};