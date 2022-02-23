/* Event Routes

    host/api/events
*/


const {Router} = require('express');
const { check } = require('express-validator');



const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require("../Controllers/events");
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jsw');

const router = Router();
//CRUD
//todas las peticiones deben de validar el token
router.use(validarJWT)

//obtenemos los eventos
router.get('/', getEventos)

//creamos eventos
router.post('/',[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de final es obligatoria').custom(isDate),
    validarCampos
], crearEvento)


//actualizamos el evento
router.put('/:id', actualizarEvento)


//eliminamos el evento
router.delete('/:id', borrarEvento)



module.exports = router;