//importamos la libreria de jwt

const jsw = require('jsonwebtoken')



const generarJWT= (uid, name)=>{
    //lo retornamos como una promesa porque es mucho mejor manejarlo
    return new Promise((resolve, reject)=>{
        //la carga util es el uid y el name para poder generar el token
        const payload = {
            uid,
            name
        }
        //funcion que nos permite la firma digitar con la palabra clave el payload del user y le definimos la hora util
        jsw.sign(payload,process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
            //jwt trabaja con callback
        },(err, token)=>{
            //retornamos si hay algun error y ejecutamos el reject
            if(err){
                console.error(err)
                reject('no se pudo generar el token')
            }
            //resolve con el toquen en el caso de que este ttodo bien
            resolve(token)
        })
    })

}



module.exports= {
    generarJWT
}