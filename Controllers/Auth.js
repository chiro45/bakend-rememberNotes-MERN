//controlador de las rutas del auth
const {response} = require('express');
const bcrypt = require ('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/Usuario')


const register =  async(req, res =  response)=>{
    const {email ,passwd}= req.body;

  try {
        const USuario =  new Usuario(req.body)
         // encriptar contraseña
        const salt = bcrypt.genSaltSync()
        USuario.passwd =  bcrypt.hashSync(passwd, salt)
        
        //le decimos que busque el email
        let usuario = USuario.findOne({email})
        //si el email existe devuelve un error
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: "Un usuario existe con ese correro"
            })
        }
        //en el caso de que no haya error se guarda en la base
        await USuario.save()
         
   
        //devolvemos el status de creado y todo perfecto
        res.status(201).json({
            ok: true,
            msg:'Register'
            
        })
    } catch (error) {
        //en el caso de que haya error devolvemos un mensaje por consola y el res status 500
        console.error(error)
        res.status(500).json({
            ok: false,
            msg:'Por Favor hable con el administrador'
            
        })
    }
    

    
    
}

const login = async(req, res)=>{

    //desestructuramos de la request el email y el passwd
    const {email ,passwd}= req.body;
    try {
        //le decimos que busque el mail en la base de datos
        let usuario = await USUARIO.findOne({email});
        //devolvemos un error diciendo que no se encontro => hay que retornar neutro
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: "Usuario o Contraseña incorrectos"
            })
        }
        //validamos el passwd de la request con el del user
        const validPasswd = bcrypt.compareSync(passwd, usuario.passwd)

        //validamos que la contraseña sea correcta  => hay que retornar neutro        
        if(!validPasswd){
            return res.status(400).json({
                ok: false,
                msg: "Usuario o Contraseña incorrectos"
            })
        }
        
        //generar json WEb token
        //generamos token de acceso
        const token = await generarJWT(usuario.id,usuario.name)
        //la res del servidor nos devuelve los datos de login
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
            
        })
        
        
        
        
    } catch (error) {
        //en el caso de error retornamos por consola y como respuesta del sv
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
}
//revalidamos el toquen en el caso de estar vencido nos lo renovara
const revalidarToken = async(req, res = response)=>{

    const {name , uid} = req;
    const token = await generarJWT(uid, name)

    res.json({
        ok: true,
        token
    })


}


module.exports ={
    register,
    revalidarToken,
    login

}