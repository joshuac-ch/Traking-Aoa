const Comentario=require("../../models/comentario")
const usuario = require("../../models/usuario")
const CreateComentario=async(req,res)=>{
    try{
        const {publicacion_id,usuario_id,like_user,tipo,comentario}=req.body
        const modelo=await Comentario.create({
            publicacion_id,
            comentario,
            usuario_id,
            like_user,
            tipo:"Comentario",
            like_user:"0"
        })
        res.status(200).json(modelo)
    }catch(err){
        throw new Error(`Hubo un error ${err.message}`);        
    }
}
const GetComentarioPublicacion=async(req,res)=>{
    try{
        const {pubID}=req.params
        const modelo=await Comentario.findAll({where:{publicacion_id:pubID}})
        if(!modelo){
            return res.status(404).json({message:"No se encontro ese comentario"})
        }
        const modeloExpandido=await Promise.all(
            modelo.map(async(m)=>{
                let creador=await usuario.findByPk(m.usuario_id)
            return{
                comentario:m,
                creador
            }
            })            
        )
        res.status(200).json(modeloExpandido)
    }catch(err){
         throw new Error(`Hubo un error ${err.message}`);  
    }
}
module.exports={CreateComentario,GetComentarioPublicacion}
