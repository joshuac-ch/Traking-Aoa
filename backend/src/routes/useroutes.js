const express=require('express')
const { GetUser, InsertUser, ShowUser, DeleteUser, UpdateUser } = require('../controllers/userController')
const { GetHabitos, InsertHabitos, UpdateHabito, Showhabito, DeleteHabito } = require('../controllers/habitoController')
const { Get_registros, Insert_registros } = require('../controllers/registro_habitosController')
const { GetMetas, InsertMetas, ShowMetas, UpdateMetas, DeleteMetas } = require('../controllers/metasController')
const { getActividades, InsetActividades, ShowActividaes, UpdateActividades, DestroyActividaes } = require('../controllers/actividadesdiariasController')
const { getEmociones, InsertEmociones } = require('../controllers/emocionesController')
module.exports=router=express()

router.get("/usuarios",GetUser)
router.post('/usuarios/c',InsertUser)
router.get("/usuarios/s/:id",ShowUser)
router.put("/usuarios/u/:id",UpdateUser)
router.delete("/usuarios/d/:id",DeleteUser)
//-----------------------------------------
router.get("/habitos",GetHabitos)
router.post('/habitos/c',InsertHabitos)
router.put("/habitos/u/:id",UpdateHabito)
router.get("/habitos/s/:id",Showhabito)
router.delete("/habitos/d/:id",DeleteHabito)
//-----------------------------------------
router.get('/registros/',Get_registros)
router.post("/registros/c",Insert_registros)
//------------------------------------------
router.get("/metas",GetMetas)
router.post("/metas/i",InsertMetas)
router.get("/metas/s/:id",ShowMetas)
router.put("/metas/u/:id",UpdateMetas)
router.delete('/metas/d/:id',DeleteMetas)
//------------------------------------------
router.get("/actividades/",getActividades)//<=>
router.get("/actividades/:usuario_id",getActividades)
router.post("/actividades/i",InsetActividades)
router.get("/actividades/s/:id",ShowActividaes)
router.put("/actividades/u/:id",UpdateActividades)
router.delete("/actividades/d/:id",DestroyActividaes)
//----------------------------------------------------
router.get("/emociones",getEmociones)
router.post("/emociones/i",InsertEmociones)