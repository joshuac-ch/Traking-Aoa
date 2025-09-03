const  {Sequelize}= require("sequelize")
const  dotenv = require("dotenv")
dotenv.config()
// Configuración de la base de datos
module.exports = sequelize = new Sequelize(
    process.env.DB_NAME||"track", 
    process.env.DB_USER||"root",
    process.env.DB_PASS||"admin123", {
    host: process.env.DB_HOST||"127.0.0.1",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false, // Desactiva logs de SQL   
});
