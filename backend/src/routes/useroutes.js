const express=require('express')
const { GetUser, InsertUser, ShowUser, DeleteUser, UpdateUser } = require('../controllers/userController')
const { GetHabitos, InsertHabitos, UpdateHabito, Showhabito, DeleteHabito, GetHabitosAll } = require('../controllers/habitoController')
const { Get_registros, Insert_registros } = require('../controllers/registro_habitosController')
const { GetMetas, InsertMetas, ShowMetas, UpdateMetas, DeleteMetas, GetMetasAll } = require('../controllers/metasController')
const { getActividades, InsetActividades, ShowActividaes, UpdateActividades, DestroyActividaes, getAllActivites } = require('../controllers/actividadesdiariasController')
const { getEmociones, InsertEmociones } = require('../controllers/emocionesController')
const { GetSeguidor, CreateSeguidor, GetActividadesSeguidor, DeleteActividadSeguidor, showUserFollow, EstatusFollow, GetHabitosSeguidor, ContadorSeguidores, ContadorSiguiendo, ListaSeguidores, ListaSiguiendo } = require('../controllers/seguidorController')
const { getAllpublicaciones, getPublicacionFollow } = require('../controllers/publicacionController')
const { InsertLove, ConteoLikes, RemoveLove, GetLikesUsuario, ShowLoves, ShowLovesCount } = require('../controllers/likesController')
module.exports=router=express()

router.get("/usuarios",GetUser)
router.post('/usuarios/c',InsertUser)
router.get("/usuarios/s/:id",ShowUser)
router.put("/usuarios/u/:id",UpdateUser)
router.delete("/usuarios/d/:id",DeleteUser)
//-----------------------------------------
router.get("/habitos/a",GetHabitosAll)
router.get("/habitos/:usuario_id",GetHabitos)
router.post('/habitos/c',InsertHabitos)
router.put("/habitos/u/:id",UpdateHabito)
router.get("/habitos/s/:id",Showhabito)
router.delete("/habitos/d/:id",DeleteHabito)
//-----------------------------------------
router.get('/registros/',Get_registros)
router.post("/registros/c",Insert_registros)
//------------------------------------------
router.get("/metas/a",GetMetasAll)
router.get("/metas/:usuario_id",GetMetas)
router.post("/metas/i",InsertMetas)
router.get("/metas/s/:id",ShowMetas)
router.put("/metas/u/:id",UpdateMetas)
router.delete('/metas/d/:id',DeleteMetas)
//------------------------------------------
router.get("/actividades/a",getAllActivites)//<=> //areglar esto cambiar la rtuta a algo como /actividades/all o a
router.get("/actividades/:usuario_id",getActividades)
router.post("/actividades/i",InsetActividades)
router.get("/actividades/s/:id",ShowActividaes)
router.put("/actividades/u/:id",UpdateActividades)
router.delete("/actividades/d/:id",DestroyActividaes)
//----------------------------------------------------
router.get("/emociones",getEmociones)
router.post("/emociones/i",InsertEmociones)
//----------------------------------------------------
router.get("/seguidores/actividadesfollow/:seguidor_id",GetActividadesSeguidor)
router.get("/seguidores/actividadesfollow/s/:seguidor_id",showUserFollow)
router.delete("/seguidores/actidadesfollow/delete/:seguidor_id/:userID",DeleteActividadSeguidor)
router.get("/seguidores",GetSeguidor)
router.post("/seguidores/follow",CreateSeguidor)
router.get("/seguidores/actividadesfollow/estatus/:seguidor_id/:seguido_id",EstatusFollow)

router.get("/seguidores/habitosFollow/:seguidor_id",GetHabitosSeguidor)

///_------------------------------------------------------------------------

router.get("/publicaciones/pub/all",getAllpublicaciones)
router.get("/publicaciones/feed/:userID",getPublicacionFollow)

//--------------------------------------------------------------------------

router.post("/publicacion/likes/i/:userID/:pubID",InsertLove)
router.get("/publicacion/likes/conteo/:pubID",ConteoLikes)
router.delete("/publicacion/likes/d/:userID/:pubID",RemoveLove)

router.get("/publicacion/loves/conteo/:userID",ShowLovesCount)


router.get("/publicacion/likes/getLove/:userID",GetLikesUsuario)
router.get("/seguidor/loves/:userID",ShowLoves)
router.get("/seguidor/count/:seguido_id",ContadorSeguidores)
router.get("/seguidores/count/:seguidor_id",ContadorSiguiendo)


router.get("/listaseguidores/usuario/:userID",ListaSeguidores)
router.get("/listasigiendo/usuario/:userID",ListaSiguiendo)