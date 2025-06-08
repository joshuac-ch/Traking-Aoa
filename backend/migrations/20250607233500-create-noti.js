'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      icon: {
        type: Sequelize.STRING
      },
      titulo: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      hora: {
        type: Sequelize.DATE
      },
      usuario_id:{
      type:Sequelize.BIGINT,
           allowNull:false,
           references:{
             model:'usuario',
             key:'id'
           }
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('notis');
  }
};