const Usuarios=require("../../models/usuario")
const GetUser=async(req,res)=>{
    try{
       const modelo=Usuarios.findAll()
       if(!modelo){
        res.status(404).json({message:'No existe esta tabla'})
       }
       res.status(200).json(modelo)
    }catch(err){
        console.error("hubo un error",err)
    }
}
module.exports={GetUser}