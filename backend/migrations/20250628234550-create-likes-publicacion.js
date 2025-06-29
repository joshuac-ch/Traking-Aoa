'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('likes_publicacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      usuario_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references:{
          model:"usuario",
          key:"id"
        }
      },
      tipo_reaccion: {
        type: Sequelize.STRING
      },
      publicacion_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references:{
          model:"publicaciones",
          key:"id"
        }
      },
      fecha: {
        type: Sequelize.DATE
      }     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('likes_publicacions');
  }
};