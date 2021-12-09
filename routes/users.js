const { Router } = require('express');
//Importo para validar jwt token
const { validarJWT } = require('../middlewares/validar-jwt');

//const { getEventos} = require('../controllers/users');

const router = Router();

// Tienen que pasar por la validación del JWT
router.use( validarJWT );

// Obtener usuarios
router.get('/usuarios', async (req, res) => {
    const empleados = await personal.find();
    res.send(empleados)
});


module.exports = router;