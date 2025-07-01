const actividades_diarias = require("../../models/actividades_diarias");
const habitos = require("../../models/habitos");
const LikesPub=require("../../models/likes_publicacion");
const publicaciones = require("../../models/publicaciones");
const usuario = require("../../models/usuario");
const GetLikesUsuario = async (req, res) => {
  try {
    const { userID } = req.params;

    const likes = await LikesPub.findAll({
      where: {
        usuario_id: userID,
        tipo_reaccion: "me encanta"
      },
      attributes: ['publicacion_id']
    });

    // Devuelve un array de IDs de publicaciones que ya dio like
    const resultado = likes.map(like => like.publicacion_id);

    res.status(200).json(resultado);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error al cargar likes del usuario" });
  }
};
const InsertLove=async(req,res)=>{
    const {userID,pubID}=req.params
    const yaexiste=await LikesPub.findOne({where:{
        usuario_id:userID,publicacion_id:pubID
    }})
    if(yaexiste){
        return res.status(409).json({message:"ya diste like"})
    }
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
const ShowLoves=async(req,res)=>{
  const {userID}=req.params
  const modelo=await LikesPub.findAll({
    where:{usuario_id:userID}
  })
  const dataExpandida=await Promise.all(
    modelo.map(async(d)=>{
      let publicacion=await publicaciones.findByPk(d.publicacion_id)
      let valor=null
      if(publicacion.tipo=="Actividad"){
          valor=await actividades_diarias.findByPk(publicacion.contenido_id)
      }
      else if(publicacion.tipo=="Habito"){
        valor=await habitos.findByPk(publicacion.contenido_id)
      }
      let creador=await usuario.findByPk(d.usuario_id)
      return{
        id:d.id,
        tipo:publicacion.tipo,
        valor,
        creador
      }       
    })
  )
  res.status(200).json(dataExpandida)
}
const RemoveLove=async(req,res)=>{
    const {pubID,userID}=req.params
    await LikesPub.destroy({
        where:{publicacion_id:pubID,usuario_id:userID}
    })
    res.status(200).json({message:"Se elimino el like"})

}
module.exports={InsertLove,ConteoLikes,RemoveLove,GetLikesUsuario,ShowLoves}

