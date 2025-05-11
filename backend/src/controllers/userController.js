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
        const {nombre,apellido,correo,telefono}=req.body
        if(!nombre,!apellido,!correo,!telefono){
           return res.status(404).json({message:"Hubo un error no pueden estar vacios los campos"})
        }
        //const nombre='nino'
        //const apellido='nakano'
        //const correo='nino@gmail.com'
        //const pass="nino"
        //const telefono=910320803
        const modelo=await Usuarios.create({
            nombre:nombre,
            pass:pass,
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
const ShowUser=async(req,res)=>{
    const {id}=req.params
    const modelo=await Usuarios.findByPk(id)
    if(!modelo){
        return res.status(404).json({message:"No se encontro ese id"})
    }
    res.status(201).json(modelo)
}
const UpdateUser=async(req,res)=>{
    try{
        const {id}=req.params
        const {nombre,apellido,correo,telefono}=req.body    
        const modelo=await Usuarios.findOne({where:{id}})
        if(!modelo){
            return res.status(404).json({message:"No se encontro ese user"})
        }
        await modelo.update({
        nombre,
        apellido,
        correo,
        pass,
        telefono:10320803
        })
        res.status(200).json(modelo)
    }catch(err){
        console.error("Hubo un error")
    }
}
const DeleteUser=async(req,res)=>{
    const {id}=req.params
    const modelo=await Usuarios.destroy({where:{id}})
    if(!modelo){
        return res.status.json({message:"No se encontro ese id"})
    }
    res.status(200).json({message:"Se elimino correctamente"})
}
module.exports={GetUser,InsertUser,ShowUser,DeleteUser,UpdateUser}