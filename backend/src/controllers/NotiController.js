const notificaciores=require("../../models/noti")
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
            return{
                noti:n,
                creador
            }
        })
       )
       return res.status(200).json(notiexpandida)
        
    }catch(err){
        console.error(err.message)
    }   
}


module.exports={getAllNotificacionXUser,getAllNotificaciones}
