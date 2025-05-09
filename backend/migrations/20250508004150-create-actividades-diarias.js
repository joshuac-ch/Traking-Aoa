'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('actividades_diarias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references:{
          model:'usuario',
          key:'id'
        }
      },
      titulo: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.DATE
      }     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('actividades_diarias');
  }
};