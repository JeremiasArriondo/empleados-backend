/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
//check para validar un campo a la vez
const { crearUsuario, loginUsuario, revalidarToken, getUsuariosAuth } = require('../controllers/auth')

const router = Router();
//Configuracion de las rutas
router.get('/', getUsuariosAuth);

//Uso lleves para implementar varios middlewares y uso de express-validator
router.post(
    '/new',
    [//middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario
);
//Metodo pos, tambien se posee dos validaciones, haciendo uso de express-validator
router.post(
    '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    loginUsuario);

router.get('/renew', validarJWT, revalidarToken );


module.exports = router;
