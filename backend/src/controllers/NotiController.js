const actividades_diarias = require("../../models/actividades_diarias")
const habitos = require("../../models/habitos")
const likes_publicacion = require("../../models/likes_publicacion")
const notificaciores=require("../../models/noti")
const publicaciones = require("../../models/publicaciones")
const Seguidores = require("../../models/seguidores")
const usuario = require("../../models/usuario")
const getAllNotificaciones=async()=>{
    try{
       const modelo=await notificaciores.findAll()
       if(!modelo){
        return res.status(404).json({message:"Nose encontro el modelo"})
       }    
       res.status(200).json(modelo)
    }catch(err){
        console.error(err.message)
    }
}

const getAllNotificacionXUser=async(req,res)=>{
    try{
        const {userID}=req.params
       const seguidores=await Seguidores.findAll({where:{seguidor_id:userID,estado:true}})
       const seguidosID=seguidores.map((s)=>s.seguido_id)
       const notificacioes=await notificaciores.findAll({where:{usuario_id:seguidosID}})
       const notiexpandida=await Promise.all(
        notificacioes.map(async(n)=>{
            let creador=await usuario.findByPk(n.usuario_id)
            let post=""
            let tipo=""
            
            if(n.tipo=="Post_Actividad"){
                post=await actividades_diarias.findByPk(n.contenido_id)
                }
            else if(n.tipo=="Post_habito"){
                post =await habitos.findByPk(n.contenido_id)
            }
            return{
                noti:n,
                creador,
                post,
                tipo
            }
        })
       )
       return res.status(200).json(notiexpandida)
        
    }catch(err){
        console.error(err.message)
    }   
}
const getAllNotisLikes=async(req,res)=>{
    try{
        const {userID}=req.params
        const notificaciones=await notificaciores.findAll({where:{tipo:"likes",usuario_id:userID}})
        const modeloExpandido=await Promise.all(
            notificaciones.map(async(n)=>{
                let creador=""
                let tipo=""
                let contenido=""
                let pub=""
                pub=await publicaciones.findByPk(n.contenido_id)
                if(pub.tipo=="Habitos"){
                    contenido=await habitos.findByPk(pub.contenido_id)
                }
                else{
                    contenido=await actividades_diarias.findByPk(pub.contenido_id)
                }                
                creador=await usuario.findByPk(n.emisor_id)
                tipo=pub.tipo
                return{
                    noti:n,
                    tipo,
                    creador,
                    contenido    
                } 
            })   
        )
        res.status(200).json(modeloExpandido)    
            
    }catch(err){
        console.error(err.message)
    }
}


module.exports={getAllNotificacionXUser,getAllNotificaciones,getAllNotisLikes}
