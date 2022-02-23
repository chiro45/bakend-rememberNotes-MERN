const { response  } = require('express')
//expressvalidator nos permite hacer verificaciones en los campos de una manera mucho mas facil
const { validationResult } = require('express-validator')

//funcion de valicacion de campos en register, login
const validarCampos = (req, res= response, next)=>{
    //toma si hay algun error 
    const errors = validationResult(req)
    //en el caso de que haya 1 error por lo menos retorna el error    
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            //hace un map de los errors y nos lo devuelve en un arr dentro de un json
            errors : errors.mapped()
        })
    }
    //en el caso de que este todo perfecto ejecuta el next y continua con el proximo campo
    next();

}

module.exports = {
    validarCampos
}