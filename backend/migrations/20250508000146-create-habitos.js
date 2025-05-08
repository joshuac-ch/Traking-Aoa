'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('habitos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      titulo: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      frecuencia: {
        type: Sequelize.STRING
      },
      activo: {
        type: Sequelize.BOOLEAN
      },
      fecha_inicio:{
        type:Sequelize.DATE
      },
      usuario_id:{
        type:Sequelize.BIGINT,
        allowNull:false,
        references:{
          model:'usuario',
          key:'id'
        }
      }
     
    }   
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('habitos');
  }
};