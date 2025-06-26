const actividades_diarias = require("../../models/actividades_diarias")
const habitos = require("../../models/habitos")
const Seguidor=require("../../models/seguidores")
const GetSeguidor=async(req,res)=>{
    try{
        //const {seguidor_id,seguido_id}=req.params
        const modelo=await Seguidor.findAll()
        if(!modelo){
            return res.status(404).json({message:"No se encontro la tabla"})
        }
        res.status(200).json(modelo)
    }catch(err){
        console.error(err)
    }
}

const GetActividadesSeguidor=async(req,res)=>{
    try{
        const { seguidor_id } = req.params;

    const relaciones = await Seguidor.findAll({
      where: {
        seguidor_id,
        estado: true //solo mostrara las que sean verdadera si es falsa no la muestra OJO 
      }
    });

    const seguidoIDs = relaciones.map(r => r.seguido_id);

    const actividades = await actividades_diarias.findAll({
      where: {
        usuario_id: seguidoIDs
      }
    });

    res.status(200).json(actividades);
    }catch(err){
        console.error(err)
    }
}

const GetHabitosSeguidor=async(req,res)=>{
    try{
        const {seguidor_id}=req.params
        const modelo=await Seguidor.findAll({
            where:{seguidor_id,estado:true}
        })
        const Listseguidos=modelo.map((s)=>s.seguido_id)
        const modelhabitos=await habitos.findAll({
            where:{usuario_id:Listseguidos}
        })
        res.status(200).json(modelhabitos)
    }catch(err){
        console.error(err.message)
    }
}

const DeleteActividadSeguidor=async(req,res)=>{
    try{
        const {seguidor_id,userID}=req.params
        const modeloSeguidor=await Seguidor.update(
            {estado:false},
            {
            where:{
                seguidor_id,
                seguido_id:userID,
                estado:true
            }}
                      
        ) 
        if(!modeloSeguidor){
            return res.status(404).json({message:"No sigue ese usuario"})
        }
       
        
        res.status(200).json("Se elimino correectamente el seguidor")
    }catch(err){
        console.error(err.message)
    }
}
const EstatusFollow=async(req,res)=>{
    try{
        const {seguidor_id,seguido_id}=req.params
        const existe=await Seguidor.findOne({
            where:{seguidor_id,seguido_id,estado:true}
        })
        res.status(200).json(existe)
    }catch(err){
        console.error(err.message)
    }
}
const showUserFollow=async(req,res)=>{
    try{
        const {seguidor_id}=req.params
        const modelo=await Seguidor.findOne({
            where:{seguidor_id}
        })
        if(!modelo){
            return res.status(404).json({message:"No sigue a este usuario"})
        }
        res.status(200).json(modelo)
    }catch(err){
        console.error(err.message)
    }
} 
const CreateSeguidor=async(req,res)=>{
    try{
        const {seguidor_id,seguido_id,fecha,estado}=req.body
       const modelo=await Seguidor.create({
            seguidor_id,
            seguido_id,
            fecha:new Date(),
            estado:true            
       })
       res.status(200).json({message:"Se añadio el nuevo seguidor"})
    }catch(err){
    console.error(err)
}}
module.exports={CreateSeguidor,GetSeguidor,GetActividadesSeguidor,DeleteActividadSeguidor,showUserFollow,EstatusFollow,GetHabitosSeguidor}