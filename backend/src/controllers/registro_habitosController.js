const registros_habitos=require("../../models/registros_habitos")
const Get_registros=async(req,res)=>{
    try{
        const modelo=await registros_habitos.findAll()
        if(!modelo){
            return res.status(404).json({message:"No se enocntro el modelo"})
        }
        res.status(200).json(modelo)
    }catch(err){
        console.error("Hubo uyn error",err.message)
    }
}
const Insert_registros=async(req,res)=>{
    try{
        //const habito_id=3
        //const completado=1
        //const nota="no hubo problemas"
        const {habito_id,fecha,completado,nota}=req.body
        if(!completado){
            return res.status(404).json({message:"No dio una respuesta"})
        }
        const modelo=await registros_habitos.create({
            habito_id,
            fecha:new Date(),
            completado:completado,
            nota
        })
        res.status(200).json(modelo)
    }catch(e){
    console.error("Hubo un error",e.message)
    }
}

module.exports={Get_registros,Insert_registros}