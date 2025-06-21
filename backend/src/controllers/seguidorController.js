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
module.exports={CreateSeguidor,GetSeguidor}