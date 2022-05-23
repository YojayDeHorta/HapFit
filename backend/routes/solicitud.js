const router = require('express').Router();
const solicitudEntrenador = require('../controllers/solicitudEntrenador');
const validarAdmin = require('../middlewares/validate-admin');
const validarCliente = require('../middlewares/validate-cliente');
const validarTodo = require('../middlewares/validate-all');



router.get('/',validarAdmin, solicitudEntrenador.getSolicitudes)
router.post('/',validarCliente, solicitudEntrenador.setSolicitud)
router.post('/aceptar',validarAdmin, solicitudEntrenador.aceptarSolicitud)
router.post('/rechazar',validarAdmin, solicitudEntrenador.rechazarSolicitud)










module.exports = router;
