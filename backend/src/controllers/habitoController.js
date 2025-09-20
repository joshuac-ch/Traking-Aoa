const habitos = require("../../models/habitos")
const Habitos=require("../../models/habitos")
const likes_publicacion = require("../../models/likes_publicacion")
const noti = require("../../models/noti")
const publicaciones = require("../../models/publicaciones")
const GetHabitosAll=async(req,res)=>{
    try{
        const modelo=await Habitos.findAll()
        if(!modelo){
            return res.status(404).json({message:"No se encontro el modelo"})
        }
        res.status(200).json(modelo)
    }catch(err){
        console.error(err.message)
    }
}
const GetHabitos=async(req,res)=>{
    try{
    const {usuario_id}=req.params
    const modelo=await Habitos.findAll({where:{usuario_id}})
    if(!modelo){
        return res.status(404).json({message:"No se encontro ese habito"})
    }
    res.status(200).json(modelo)
    }catch(err){
        console.error(err.message)
    }
}
const InsertHabitos=async(req,res)=>{
    //const  titulo="Comer 5 comidas al dia"
    //const descripcion=""
    //const frecuencia="todos los dias"
    //const activo=1
    //const fecha_inicio
    //const usuario_id=1
    try{
        const {titulo,descripcion,imagen,frecuencia,activo,fecha,usuario_id}=req.body
    if(!titulo||!frecuencia){
        return res.status(404).json({message:"No se llenaron todos los campos"})
    }
    const modelo=await Habitos.create({
        titulo,
        imagen,
        descripcion,
        frecuencia,
        activo:1,
        fecha:new Date(),
        usuario_id,
    })
    
    //await publicaciones.create({
    //    usuario_id,
    //    contenido_id:modelo.id,
    //    tipo:"Habitos",
    //    creacion:new Date()
    //})
    res.status(200).json({message:"Se creo el habito correctamente"})
    }catch(err){
        console.error(err.message)
    }
}
//const GetAllPublicacionesActividades=async(req,res)=>{
//    try{
//        const modeloActividades=await 
//    }catch(err){
//        console.error(err.message)
//    }
//}
const CrearPublicacionHabitos=async(req,res)=>{
    try{
        const {id,userID}=req.params
        const modelo=await habitos.findByPk(id)
        if(!userID){
            return res.status(404).json({message:"No se encontro ese usuario"})
        }
        const pub=await publicaciones.findOne({where:{contenido_id:id,tipo:"Habitos"}})
        if(!pub){
            
            await publicaciones.create({
            usuario_id:userID,
            contenido_id:modelo.id,
            tipo:"Habitos",
            creacion:new Date()
        })      
            await noti.create({
            tipo:"Post_habito",
            contenido_id:modelo.id,
            mensaje:"creo un nuevo post",
            hora:new Date(),
            usuario_id:userID,
            emisor_id:0
        })    
    }
        res.status(200).json("See creo la publicacion habitos")
    }catch(err){
        console.error(err.message)
    }
}
const GetAllPublicacionesHabitos=async(req,res)=>{
    try{
        const modelopub=await publicaciones.findAll({where:{tipo:"Habitos"}})
        const modeloexpandido=await Promise.all(
            modelopub.map(async(p)=>{
                let rutina=null
                if(p.tipo=="Habitos"){
                    rutina= await habitos.findByPk(p.contenido_id)
                }
                return{
                    pub:p,
                    rutina                    
                }
            })
        )        
        res.status(200).json(modeloexpandido) 
    }catch(err){
        console.error(err.message)
    }
}
const UpdateHabito=async(req,res)=>{
    const {id}=req.params
    const {titulo,descripcion,frecuencia,imagen,activo,usuario_id}=req.body
    //const  titulo="Comer 5 comidas al dia"
    //const descripcion=""
    //const frecuencia="todos los dias"
    //const activo=1   
    //const usuario_id=3
    if(!titulo||!frecuencia){
        return res.status(404).json({message:"No se llenaron todas las columnas"})
    }
    const modelo=await habitos.findByPk(id)
    if(!modelo){
        return res.status(404).json({message:"No se encontro ese id"})
    }
    await modelo.update({
        titulo,
        imagen,
        descripcion,
        frecuencia,
        activo,
        fecha:new Date(),
        usuario_id,
    })
    res.status(200).json(modelo)
}
const Showhabito=async(req,res)=>{
    try{
        const {id}=req.params
        const modelo=await habitos.findByPk(id)
        if(!modelo){
            return res.status(404).json({message:"No se encontro ese id"})
        }
        res.status(200).json(modelo)
    }catch(err){
        console.error("Hubo un error",err.message)
    }
}
const DeleteHabito=async(req,res)=>{
    try{
        const {id}=req.params
        const modelo=await habitos.destroy({where:{id:id}})
        const publicacion=await publicaciones.findOne({where:{contenido_id:id}})
        if(publicacion){
            let publi=publicacion.id
            await noti.destroy({where:{contenido_id:id}})
            const likes=await likes_publicacion.findOne({where:{publicacion_id:publi}})
            if(likes){
                await likes_publicacion.destroy({where:{publicacion_id:publi}})
                await noti.destroy({where:{contenido_id:publi,tipo:"likes"}})
            }//ver el publi aqui en habito controller
            
                await publicaciones.destroy({where:{contenido_id:id,tipo:"Habitos"}})
            
            }
        if(!modelo){
            return res.status(404).json({message:"No se encontro ese habito"})
        }
        res.status(200).json({message:"Se elimino correctamente el habito"})
    }catch(err){
        console.error("Hubo un error",err.message)
    }
}
module.exports={GetHabitos,InsertHabitos,UpdateHabito,Showhabito,DeleteHabito,GetHabitosAll,CrearPublicacionHabitos,GetAllPublicacionesHabitos}