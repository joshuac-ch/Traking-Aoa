const ActividadesDiarias=require("../../models/actividades_diarias")
const publicaciones = require("../../models/publicaciones")
const notificaciones=require("../../models/noti")
const noti = require("../../models/noti")
const likes_publicacion = require("../../models/likes_publicacion")
const getAllActivites=async(req,res)=>{
    try{
        const modelo=await ActividadesDiarias.findAll()
        if(!modelo){
            return res.status(404).json({message:"No se encontro el modelo"})
        }
        res.status(200).json(modelo)
    }catch(err){
        console.error(err.message)
    }
}
const getActividades=async(req,res)=>{
    try{
        const {usuario_id}=req.params
        const modelo=await ActividadesDiarias.findAll({where:{usuario_id}})
        if(!modelo){
            return res.status(404).json({message:"No se encontro ese modelo"})
        }
        res.status(200).json(modelo)
    }catch(err){
        console.error("Hubo un error",err.message)
    }
}
const InsetActividades=async(req,res)=>{
    try{
        const {usuario_id,titulo,descripcion,imagen,fecha}=req.body
        //const usuario_id=1
        //const titulo="Estudiar AWS"
        //const descripcion="Descripcion breve"
        //const fecha=new Date()
        if(!usuario_id,!titulo,!descripcion){
            return res.status(404).json({message:"No se rellenaroin los campos"})
        }
        const modelo=await ActividadesDiarias.create({
            usuario_id,
            imagen,
            titulo,
            descripcion,
            fecha:new Date()
        })        
        

        res.status(200).json(modelo)
    }catch(err){
        console.error("Hubo un error",err.message)
    }
}
const GetAllPublicacionesActividades=async(req,res)=>{
    try{
       
        const modeloPublicaciones=await publicaciones.findAll({where:{tipo:"Actividades"}})
        const modeloExpandido=await Promise.all(
            modeloPublicaciones.map(async(p)=>{
                let rutina=""
                if(p.tipo=="Actividades"){
                    rutina= await ActividadesDiarias.findByPk(p.contenido_id)
                }
                return{
                    pub:p,
                    rutina
                }
            })
        )
        res.status(200).json(modeloExpandido) 
    }catch(err){
        console.error(err.message)
    }
}
const ShowActividaes=async(req,res)=>{
    try{
        const {id}=req.params
        const modelo=await ActividadesDiarias.findByPk(id)
        if(!modelo){
            return res.status(404).json({message:"No se encontro ese id"})
        }
        res.status(201).json(modelo)
    }catch(err){
        console.error("Hubo un error: ",err.message)
    }
}
const UpdateActividades=async(req,res)=>{
    try{
        const {id}=req.params
        //const usuario_id=1
        //const titulo="Hacer clas de react native diario"
        //const descripcion="breve"
        //const fecha=new Date()
        const {usuario_id,titulo,descripcion,fecha,imagen}=req.body
        if(!usuario_id||!titulo||!descripcion||!fecha){
            return res.status(404).json({message:"No se llenaron las columnas"})
        }
        const modelo=await ActividadesDiarias.findByPk(id)
        if(!modelo){
            return res.status(404).json({message:"No senocntro ese id"})
        }
        await modelo.update({
            usuario_id,
            imagen,
            titulo,
            descripcion,
            fecha:new Date()
        })
        res.status(200).json(modelo)
    }catch(err){
        console.error(err.message)
    }
}
const CreatePublicacionActividades=async(req,res)=>{
    try{
        const {id,userID}=req.params
        //const {usuario_id}=req.body
        const modelo=await ActividadesDiarias.findByPk(id)
        const pub=await publicaciones.findOne({where:{contenido_id:id,tipo:"Actividades"}})
        if(!pub){
        await publicaciones.create({
            usuario_id:userID,
            contenido_id:modelo.id,
            tipo:"Actividades",
            creacion:new Date()
        })
        //solo Si publica tambien notificara al creador
        await notificaciones.create({
            tipo:"Post_Actividad",
            contenido_id:modelo.id,
            mensaje:`creo un nuevo post`,
            hora:new Date(),
            usuario_id:userID,
            emisor_id:0
        
        })  
    }

        res.status(200).json({message:"creado"})
    }catch(err){
        console.error(err.message)
    }
}
const DestroyActividaes=async(req,res)=>{
    try{
        const {id}=req.params
        const modelo=await ActividadesDiarias.destroy({where:{id:id}})
        const publicacion=await publicaciones.findOne({where:{contenido_id:id}})
       if(publicacion){
         let publi=publicacion.id
        await noti.destroy({where:{contenido_id:id}})
        const likes=await likes_publicacion.findOne({where:{publicacion_id:publi}})
        if(likes){
            await likes_publicacion.destroy({where:{publicacion_id:publi}})
            await noti.destroy({where:{contenido_id:publi,tipo:"likes"}})
        }
        
            await publicaciones.destroy({where:{contenido_id:id,tipo:"Actividades"}})//se agrego esta linea
        
       }
        if(!modelo){
            return res.status(404).json({message:"No se encontro el id"})
        }
        res.status(201).json({message:"Se elimino la actividad"})
    }catch(err){
        console.error(err.message)
    }    
}
module.exports={getActividades,InsetActividades,ShowActividaes,UpdateActividades,DestroyActividaes,getAllActivites,CreatePublicacionActividades,GetAllPublicacionesActividades}