//const sequelize = require('sequelize')
const app=require('./app')
const router=require('./routes/useroutes')
app.use("/",router)
const port=process.env.port|| 4000
app.listen(port,()=>{
    console.log(`Entra al siguiente puerto: http://localhost:${port}`)
    console.log(process.env.DB_NAME)
})