const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
//Importo para validar jwt token
const { validarJWT } = require('../middlewares/validar-jwt');

const { getEventos, crearEvento, actualizarEvento, eliminarEvento, getEventosEnEspera } = require('../controllers/events');

const router = Router();

// Tienen que pasar por la validación del JWT
//Al hacer esto cualquier peticion que siga en este codigo va a tener que pasar por la validación
router.use( validarJWT );


// Obtener eventos 
router.get('/', getEventos );

//Obtener eventos a la espera de ser aceptados por el admin
router.get('/list', getEventosEnEspera)


// Crear un nuevo evento
router.post(
    '/',
    [
        check('tipo','El titulo es obligatorio').not().isEmpty(),
        check('fechaJornada','La fecha de la jornada es obligatoria').custom( isDate ),
        //Custom esta esperando un callback o una funcion para validar
        check('horaDeInicio','La hora de entrada es obligatoria').custom( isDate ),
        check('horaDeFin','La hora de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento 
);

// Actualizar Evento
router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('date','La fecha de la jornada es obligatoria').custom( isDate ),
        check('hourStart','La hora de entrada es obligatoria').custom( isDate ),
        check('hourEnd','La hora de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento 
);

// Borrar evento, solo para uso del admin
router.delete('/:id', eliminarEvento );

module.exports = router;