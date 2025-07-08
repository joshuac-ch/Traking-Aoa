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
      tipo: {
        type:Sequelize.STRING}
        ,
      contenido_id:{
        type: Sequelize.STRING
      },    
      mensaje:{
        type:Sequelize.STRING
      },
      hora:{
        type: Sequelize.DATE
      },    
      emisor_id:{
        type:Sequelize.BIGINT
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