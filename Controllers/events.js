const {response} = require("express")
const Evento = require("../models/Evento")

const getEventos = async(req, res= response)=>{



try {
    const eventos = await Evento.find()
                                .populate('user', 'name')
    
    res.status(200).json({
        ok: true,
        eventos
    })

    
} catch (error) {
    res.status(500).json({
        ok: true,
        msg: "no se pudo obtener los eventos"
    })
}


}

const crearEvento = async(req, res = response)=>{


    
    let eventoGuardado = new Evento(req.body)
    
    try {
            eventoGuardado.user = req.uid
            await eventoGuardado.save()
            res.status(200).json({
                ok: true,
                eventoGuardado
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok:false,
                msg: 'Hable con el administrador'
            })
        }

}


const actualizarEvento = async(req, res= response)=>{
        const eventId = req.params.id; 
        
        const {uid} = req;
        try {
        const actualizar = await Evento.findById(eventId)
        if(!actualizar){
            return res.status(404).json({
                ok:false,
                msg: 'Evento no encontrado'
            })
        }

        if(actualizar.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg: 'No tiene privilegios para editar el elemento'
            })
        }

        const  nuevoEvento = {
            ...req.body,
            user: uid
        }
        const eventoActualizado = await Evento.findByIdAndUpdate(eventId, nuevoEvento, {new: true})
     
        res.status(200).json({
            ok: true,
            eventoActualizado
        })

        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'hable con el admin'
                
            })
        }
   
}




const borrarEvento = async(req, res= response)=>{
    const eventId = req.params.id; 
        
    const {uid} = req;
    try {
    const actualizar = await Evento.findById(eventId)
    if(!actualizar){
        return res.status(404).json({
            ok:false,
            msg: 'Evento no encontrado'
        })
    }

    if(actualizar.user.toString() !== uid){
        return res.status(401).json({
            ok:false,
            msg: 'No tiene privilegios para eliminar el elemento'
        })
    }

    
    await Evento.findByIdAndDelete(eventId)
 
    res.status(200).json({
        ok: true,
        msg:'Evento removido con exito'
    })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
            
        })
    }
    


}

module.exports = {
    crearEvento,
    getEventos,
    actualizarEvento,
    borrarEvento
}