'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('metas', {
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
      imagen:{
        type: Sequelize.STRING
      },
      titulo: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      proceso: {
        type: Sequelize.INTEGER
      },
      meta_total: {
        type: Sequelize.INTEGER
      },
      fecha_limite: {
        type: Sequelize.DATE
      },
      fecha_inicio: {
        type: Sequelize.DATE
      }            
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('metas');
  }
};