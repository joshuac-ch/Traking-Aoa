//const sequelize = require('sequelize')
const app=require('./app')
const router=require('./routes/useroutes')
app.use("/",router)
const port=process.env.port|| 4000
ruta_app="192.168.18.24"
app.listen(port,()=>{
    console.log(`Entra al siguiente puerto: http://${ruta_app}:${port}`)
    console.log(process.env.DB_NAME)
})