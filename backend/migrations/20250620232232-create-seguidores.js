'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('seguidores', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
       
      },      
      seguidor_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references:{
             model:'usuario',
             key:'id'
           }        
      },
      seguido_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references:{
             model:'usuario',
             key:'id'
           }
      },
      fecha: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.BOOLEAN
      }     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('seguidores');
  }
};