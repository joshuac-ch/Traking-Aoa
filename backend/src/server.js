//const sequelize = require('sequelize')
const app=require('./app')
const path=require('path')
const express=require('express')
const router=require('./routes/useroutes')
// ⚠️ IMPORTANTE: debe ir antes de app.use("/",router)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/",router)
const port=process.env.port|| 4000
ruta_app="192.168.18.20"

app.listen(port,()=>{
    console.log(`Entra al siguiente puerto: http://${ruta_app}:${port}`)
    console.log(process.env.DB_NAME)
})