const express=require('express')
const { GetUser } = require('../controllers/userController')
module.exports=router=express()

router.get("/usuarios",GetUser)