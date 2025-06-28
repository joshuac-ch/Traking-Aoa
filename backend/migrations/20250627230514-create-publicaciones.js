'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('publicaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      usuario_id: {
       type:Sequelize.BIGINT,
             allowNull:false,
             references:{
               model:"usuario",
               key:"id"
             } 
      },
      contenido_id: {
        type: Sequelize.BIGINT
      },
      tipo: {
        type: Sequelize.STRING
      },
      creacion: {
        type: Sequelize.DATE
      }      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('publicaciones');
  }
};