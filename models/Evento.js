//usamos mongoose para darle el esquema necesario a los campos del usuario
const {model, Schema} = require('mongoose');



const EventoSchema =  Schema({
    title:{
        type: String,
        required: true
    },
    notes:{
        type: String
    },
    start:{
        type: Date,
        required: true,
            
    },
    end:{
        type: Date,
        required: true,
   
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    
    
})

EventoSchema.method('toJSON', function(){
    const {__v,_id,...object} = this.toObject();
    object.id = _id;
    return object
})


                    //se exporta de esta manera con el metodo del moongose
module.exports = model('Evento', EventoSchema)