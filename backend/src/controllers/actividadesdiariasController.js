const ActividadesDiarias=require("../../models/actividades_diarias")
const publicaciones = require("../../models/publicaciones")
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
        if(!usuario_id,!titulo,!descripcion,!fecha){
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
        await publicaciones.create({
            usuario_id:userID,
            contenido_id:modelo.id,
            tipo:"Actividades",
            creacion:new Date()
        })
        res.status(200).json({message:"creado"})
    }catch(err){
        console.error(err.message)
    }
}
const DestroyActividaes=async(req,res)=>{
    try{
        const {id}=req.params
        const modelo=await ActividadesDiarias.destroy({where:{id}})
        if(!modelo){
            return res.status(404).json({message:"No se enocntro el id"})
        }
        res.status(201).json({message:"Se elimino la actividad"})
    }catch(err){
        console.error(err.message)
    }    
}
module.exports={getActividades,InsetActividades,ShowActividaes,UpdateActividades,DestroyActividaes,getAllActivites,CreatePublicacionActividades}