const Emociones=require("../../models/emociones")
const getEmociones=async(req,res)=>{
    try{
        const modelo=await Emociones.findAll()
        if(!modelo){
            return res.status(404).json({message:"No se enocntro ese modelo"})
        }
        res.status(200).json(modelo)
    }catch(err){
        console.error("Hubvo un error",err.message)
    }
}
const InsertEmociones=async(req,res)=>{
    try{
            //const usuario_id=1
            //const emocion="medio"
            //const nivel=1
            //const fecha=new Date()
            //const comentario=''
        const {usuario_id,emocion,nivel,fecha,comentario}=req.body
        if(!usuario_id||!emocion||!nivel){
            return res.status(404).json({message:"No se llenaron todos los campos"})
        }
        const modelo=await Emociones.create({
            usuario_id,
            emocion,
            nivel,
            fecha:new Date(),
            comentario
        })
        res.status(200).json(modelo) 
    }catch(err){
        console.error("Hubbo un error",err.message)
    }
}
module.exports={getEmociones,InsertEmociones}