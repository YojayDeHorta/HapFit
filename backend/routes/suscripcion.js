const router = require('express').Router();
const suscripcion = require('../controllers/suscripcion');
const validarEntrenador = require('../middlewares/validate-entrenador');
const validarTodo = require('../middlewares/validate-all');

router.post('/',validarTodo, suscripcion.setSuscripcion)
//clientes
router.get('/clientes',validarEntrenador, suscripcion.getClientesContratados)
//entrenadores
router.get('/entrenadores',validarTodo, suscripcion.getEntrenadoresContratados)

//planes
router.get('/planes/:idUsuario',validarTodo, suscripcion.getPlanes)
router.post('/planes',validarEntrenador, suscripcion.setPlanes)
router.delete('/planes',validarEntrenador, suscripcion.deletePlanes)

module.exports = router;
