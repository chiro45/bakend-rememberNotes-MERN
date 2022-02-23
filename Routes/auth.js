/*
Rutas de usuarios/auth
host + /api/auth

*/
const {Router} = require('express');
const { register,  revalidarToken, login } = require('../Controllers/Auth');

const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jsw');


const router = Router();


//definimos la ruta 
router.post('/',[//middlewares
    check('email','El email es obligatorio').isEmail(), 
    check('passwd','El passWd debe de ser de 6 caracteres').isLength({min: 8}),
    validarCampos

],  login)
//definimos la ruta 
router.post('/register',[//middlewares
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('passwd','El passWd debe de ser de 6 caracteres').isLength({min: 8}),
    validarCampos

], register)
//definimos la ruta     en este caso solo hay un middlewere 
router.get('/renew', validarJWT, revalidarToken)







module.exports = router;

