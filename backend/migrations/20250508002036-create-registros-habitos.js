'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('registros_habitos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      habito_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references:{
          model:'habitos',
          key:'id'
        }
      },
      fecha: {
        type: Sequelize.DATE
      },
      completado: {
        type: Sequelize.BOOLEAN
      },
      nota: {
        type: Sequelize.STRING
      },
      
    });
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('registros_habitos');
  }
};