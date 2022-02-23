//usamos mongoose para darle el esquema necesario a los campos del usuario
const {model, Schema} = require('mongoose')

//name email y passwd son encesarios para el usuario
const UsuariosSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,   //type
        required: true,  //si o si requerido
        unique: true    //le decimos que tiene que ser unico
    },
    passwd:{
        type: String,
        required: true,
    }
})


                    //se exporta de esta manera con el metodo del moongose
module.exports = model('Usuario', UsuariosSchema)