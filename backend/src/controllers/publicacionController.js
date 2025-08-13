const actividades_diarias = require("../../models/actividades_diarias")
const habitos = require("../../models/habitos")
const likes_publicacion = require("../../models/likes_publicacion")
const noti = require("../../models/noti")
const publicaciones = require("../../models/publicaciones")
const Seguidor = require("../../models/seguidores")
const usuario = require("../../models/usuario")
const DeletePublicacion=async(req,res)=>{//mejorarlo
    try{
        const {id}=req.params
        const modelo=await publicaciones.findOne({where:{contenido_id:id}})
        if(!modelo){
            return res.status(404).json({message:"No se encontro esa publicacion con ese contenido"})
        }
        let publicacion=modelo.id
        await noti.destroy({where:{contenido_id:id}})
        const likes=await likes_publicacion.findOne({where:{publicacion_id:publicacion}})
        if(likes){
            await likes_publicacion.destroy({where:{publicacion_id:publicacion}})
            await noti.destroy({where:{contenido_id:publicacion,tipo:"likes"}})
        }
        await publicaciones.destroy({where:{contenido_id:id}})
        
        res.status(200).json({message:"Se elimino correctamente"})
    }catch(err){
        console.error(err.message)
    }
    
}
const getAllpublicaciones=async(req,res)=>{
    const modelo=await publicaciones.findAll()
    if(!modelo){
        return res.status(404).json({message:"No se encontro el modelo"})
    }
    res.status(200).json(modelo)
}
const getPublicacionFollow=async(req,res)=>{
    const {userID}=req.params
    const modeloSeguidores=await Seguidor.findAll({
        where:{seguidor_id:userID,estado:true}
    })
    const idSeguidos=modeloSeguidores.map((s)=>s.seguido_id)
    const publicacion=await publicaciones.findAll({where:{usuario_id:idSeguidos}})
    //desustrurta los datos
    const publicacionExpandida=await Promise.all(
        publicacion.map(async(p)=>{
            let contendo=0
            if(p.tipo=="Actividades"){
                contendo=await actividades_diarias.findByPk(p.contenido_id)
            }
            else if(p.tipo=="Habitos"){
                contendo=await habitos.findByPk(p.contenido_id)
            }
            let creador=await usuario.findByPk(p.usuario_id)
            return{
                id:p.id,
                tipo:p.tipo,
                creador,
                contendo
            }
        })
    )
    res.status(200).json(publicacionExpandida) 
}
const GetPublicacionActividadXuser=async(req,res)=>{
    const {userID}=req.params
    const modelo=await publicaciones.findAll({where:{usuario_id:userID,tipo:"Actividades"}})
    const modeloExpandido=await Promise.all(
        modelo.map(async(m)=>{
            let rutina=""
            if(m.tipo=="Actividades"){
                rutina= await actividades_diarias.findByPk(m.contenido_id) 
            }            
            return{
                pub:m,
                rutina
            }
        })
    )
    return res.status(200).json(modeloExpandido)
}
const GetPublicacionHabitosUser=async(req,res)=>{
    const {userID}=req.params
    const modelo=await publicaciones.findAll({where:{usuario_id:userID,tipo:"Habitos"}})
    const modeloExpandido=await Promise.all(
        modelo.map(async(m)=>{
            let rutina=""
            if(m.tipo=="Habitos"){
                rutina=await habitos.findByPk(m.contenido_id)
            } 
            return{
                pub:m,
                rutina
            }
        })
    )
    res.status(200).json(modeloExpandido)
}
const GetStatusPub=async(req,res)=>{
    const {id}=req.params
    const modelo=await publicaciones.findOne({where:{contenido_id:id}})
    if(!modelo){
        return res.status(404).json({message:"No se encontro esa publicacion"})
    }
    res.status(200).json(modelo)
}

//Crear aqui el pos publicacion y enviarselo a actividaes y habitos 
module.exports={getAllpublicaciones,getPublicacionFollow,GetPublicacionActividadXuser,GetPublicacionHabitosUser,DeletePublicacion,GetStatusPub}