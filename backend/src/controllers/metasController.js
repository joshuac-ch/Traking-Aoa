const Metas=require("../../models/metas")
const GetMetas=async(req,res)=>{
    try{
        const modelo=await Metas.findAll()
        if(!modelo){
            return res.status(404).json({message:"No se encontro el modelo"})
        }
        res.status(200).json(modelo)
    }catch(err){
        console.error("Se encontro un error",err.message)
    }
    
}
const InsertMetas=async(req,res)=>{
    try{
        const {usuario_id,titulo,descripcion,proceso,fecha_inicio,meta_total,fecha_limite,imagen}=req.body
        if(!usuario_id,!titulo,!meta_total,!fecha_limite){
           return res.status(404).json({message:"No se lleno los campos necesarios"})
        }
        //const usuario_id=1
        //const titulo="Levantarse temprano"
        //const descripcion=''
        //const inicio=total
        //
        //const fecha_limite='2025-05-31 18:35:05'
        //const meta_total=1
        const modelo=await Metas.create({
            usuario_id,
            titulo,
            descripcion,
            proceso:0,
            meta_total,
            fecha_limite,
            imagen,
            fecha_inicio:new Date()
        })
        res.status(200).json(modelo)
    }catch(err){
        console.error("Hubo un error",err.message)
    }
}
const ShowMetas=async(req,res)=>{
    try{
        const {id}=req.params
        const modelo=await Metas.findByPk(id)
        if(!modelo){
            return res.status(404).json({message:"No se encontro ese id"})
        }
        res.status(200).json(modelo)
    }catch(err){
        console.error(err.message)
    }
}
//Verificar esta funcion en el a la hora de usar el proyecto
const UpdateMetas=async(req,res)=>{
    try{
          const {id}=req.params
          const {usuario_id,titulo,descripcion,proceso,meta_total,fecha_limite,imagen}=req.body
          if(!titulo || !meta_total || !fecha_limite){
            return res.status(404).json({message:"No se encontro esa meta"})
          }
          const modelo=await Metas.findByPk(id)
          if(!modelo){
            return res.status(404).json({message:"No se enocntro esa meta"})
          }
          await modelo.update({
            usuario_id,
            titulo,
            descripcion,
            proceso:proceso,
            meta_total,
            imagen,
            fecha_limite
          })
          res.status(200).json(modelo)
    }catch(err){
        console.error("Se encontro un error",err.message)
        
    }    
}
const DeleteMetas=async(req,res)=>{
    try{
        const {id}=req.params
        const modelo=await Metas.destroy({where:{id}})
        if(!modelo){
            return res.status(404).json({message:"No se encontro ese id"})
        }
        res.status(200).json({message:"Se elimino correctamente el id de la meta"})
    }catch(err){
        console.error("Hubo un error",err.message)
    }
}
module.exports={GetMetas,InsertMetas,ShowMetas,UpdateMetas,DeleteMetas}