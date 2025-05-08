'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emociones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
     usuario_id: {
           type:Sequelize.BIGINT,
           allowNull:false,
           references:{
             model:'usuario',
             key:'id'
           }
         },
      emocion: {
        type: Sequelize.STRING
      },
      nivel: {
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE
      },
      comentario: {
        type: Sequelize.TEXT
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('emociones');
  }
};