const {response} = require('express');
const jwt = require('jsonwebtoken')
const validarJWT = (req, res = response, next)=>{

    //x-token headers => va en la url de la peticion 

    const token = req.header('x-token')
    //si el token no existe retorna el error
    if(!token){
        return res.status(401).json({
                ok: false,
                msg: 'no hay token en la peticion'
            })
    }  

    try {
        //desestructura el uid y el name de la verificacion del token
        const {uid, name}  = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        //cambiamos su valor por los nuevos
        req.uid = uid;
        req.name = name;

    } catch (error) {
        //si hay un error nos lo retornara con su error respectivo
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
    //si estat todo perfecto pasara a su siguiente ejecucion
    next()

}


module.exports= {
    validarJWT
}