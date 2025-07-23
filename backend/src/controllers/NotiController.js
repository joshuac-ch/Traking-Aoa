const actividades_diarias = require("../../models/actividades_diarias")
const habitos = require("../../models/habitos")
const likes_publicacion = require("../../models/likes_publicacion")
const notificaciores=require("../../models/noti")
const publicaciones = require("../../models/publicaciones")
const Seguidores = require("../../models/seguidores")
const usuario = require("../../models/usuario")
const getAllNotificaciones=async(req,res)=>{
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
//hacer todo tipo de pruebas en notificaciones 
//all eliminar la actividad tambien eliminar la notificaicon para que no salga error
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
            let pub=""
            let pubID=""
            
            if(n.tipo=="Post_Actividad"){
                tipo="Actividades"
                post=await actividades_diarias.findByPk(n.contenido_id)
                pub=await publicaciones.findOne({where:{tipo:"Actividades",contenido_id:n.contenido_id}})
                pubID=pub?pub.id:0
                }
            else if(n.tipo=="Post_habito"){
                tipo="Habitos"    
                post =await habitos.findByPk(n.contenido_id)
                pub=await publicaciones.findOne({where:{tipo:"Habitos",contenido_id:n.contenido_id}})
                pubID=pub?pub.id:0
            }            
            return{
                noti:n,
                creador,
                post,
                tipo,
                pubID
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
                    tipo="Habitos"
                    contenido=await habitos.findByPk(pub.contenido_id)
                }
                else{
                    tipo="Actividades"
                    contenido=await actividades_diarias.findByPk(pub.contenido_id)
                }                
                creador=await usuario.findByPk(n.emisor_id)
                
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
const getAllNotisFollow=async(req,res)=>{//aqui agregar si sigue o no al usuario
    try{
        const {segID}=req.params
        const modelo=await notificaciores.findAll({where:{tipo:"follow",emisor_id:segID}})
        const modeloexpandido=await Promise.all(
            modelo.map(async(m)=>{
                let user=await usuario.findByPk(m.usuario_id)
                return{
                    follow:m,
                    user
                }
            })
           
        )
         res.status(200).json(modeloexpandido)
    }catch(err){
        console.error(err.message)
    }
}


module.exports={getAllNotificacionXUser,getAllNotificaciones,getAllNotisLikes,getAllNotisFollow}
