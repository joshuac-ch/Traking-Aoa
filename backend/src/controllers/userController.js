const Usuarios=require("../../models/usuario")
const GetUser=async(req,res)=>{
    try{
       const modelo=await Usuarios.findAll()
       if(!modelo){
        return res.status(404).json({message:'No existe esta tabla'})
       }
       res.status(200).json(modelo)
    }catch(err){
        console.error("hubo un error",err)
    }
}
const InsertUser=async(req,res)=>{
    try{
        //const {nombre,apellido,correo,telefono}=req.body
        //if(!nombre,!apellido,!correo,!telefono){
        //    res.status(404).json({message:"Hubo un error no pueden estar vacios los campos"})
       // }
        const nombre='nino'
        const apellido='nakano'
        const correo='nino@gmail.com'
        const telefono=910320803
        const modelo=await Usuarios.create({
            nombre:nombre,
            apellido:apellido,
            correo:correo,
            telefono:telefono
        })
        if(!modelo){
            return res.status(404).json({message:"este modelo no existe"})
        }
        res.status(200).json({message:"se creo exitosamente el modelo"})
        
    }catch(err){
        console.error("hubo un error",err)
    }
}
module.exports={GetUser,InsertUser}