const actividades_diarias = require("../../models/actividades_diarias")
const habitos = require("../../models/habitos")
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
            else if(n.tipo=="likes"){
              
                datapub = await publicaciones.findByPk(n.contenido_id) 
                tipo=datapub.tipo 
                if(tipo=="Actividades"){
                      post=await actividades_diarias.findByPk(datapub.contenido_id)
                }
                else{
                    post =await habitos.findByPk(datapub.contenido_id)
                }
                //ya se arreglo el bug el tener aqui abajo
                //esto tipo=datapub.tipo hacio que no agarre el usuario correctoa
                //post=datapub.contenido_id  
                
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


module.exports={getAllNotificacionXUser,getAllNotificaciones}
