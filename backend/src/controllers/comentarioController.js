const Comentario=require("../../models/comentario")
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
module.exports={CreateComentario}