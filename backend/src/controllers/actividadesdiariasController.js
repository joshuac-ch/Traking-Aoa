const ActividadesDiarias=require("../../models/actividades_diarias")
const getActividades=async(req,res)=>{
    try{
        const modelo=await ActividadesDiarias.findAll()
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
        const {usuario_id,titulo,descripcion,fecha}=req.body
        //const usuario_id=1
        //const titulo="Estudiar AWS"
        //const descripcion="Descripcion breve"
        //const fecha=new Date()
        if(!usuario_id,!titulo,!descripcion,!fecha){
            return res.status(404).json({message:"No se rellenaroin los campos"})
        }
        const modelo=await ActividadesDiarias.create({
            usuario_id,
            titulo,
            descripcion,
            fecha
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
        const {usuario_id,titulo,descripcion,fecha}=req.body
        if(!usuario_id,!titulo,!descripcion,!fecha){
            return res.status(404).json({message:"No se llenaron las columnas"})
        }
        const modelo=await ActividadesDiarias.findByPk(id)
        if(!modelo){
            return res.status(404).json({message:"No senocntro ese id"})
        }
        await modelo.update({
            usuario_id,
            titulo,
            descripcion,
            fecha
        })
        res.status(200).json(modelo)
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
module.exports={getActividades,InsetActividades,ShowActividaes,UpdateActividades,DestroyActividaes}