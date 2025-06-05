'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('logros', {
      id:{
            type:Sequelize.BIGINT,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
          },
          tipo: Sequelize.STRING,
          usuario_id: {
            type: Sequelize.BIGINT,
            references:{
              model:"usuario",
              key:'id'
            }
          },
          titulo: Sequelize.STRING,
          descripcion: Sequelize.STRING,
          fecha_logro: Sequelize.DATE,
          referencia_id: Sequelize.INTEGER
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('logros');
  }
};