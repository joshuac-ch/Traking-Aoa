const LikesPub=require("../../models/likes_publicacion")
const InsertLove=async(req,res)=>{
    const {userID,pubID}=req.params
    const modelo=await LikesPub.create({
        usuario_id:userID,
        tipo_reaccion:"me encanta",
        publicacion_id:pubID,
        fecha:new Date()
    })
    res.status(200).json(modelo)
}
const ConteoLikes=async(req,res)=>{
    const {pubID}=req.params
    const modeloLikes=await LikesPub.count({
        where:{publicacion_id:pubID}
    })
    res.status(200).json(modeloLikes)
}
module.exports={InsertLove,ConteoLikes}

