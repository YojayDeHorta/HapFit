const router = require('express').Router();
const authController = require('../controllers/autenticacion');
const busqueda = require('../controllers/busqueda');
const validarCliente = require('../middlewares/validate-cliente');
const validarEntrenador = require('../middlewares/validate-entrenador');
const validarTodo = require('../middlewares/validate-all');

router.get('/admin', validarEntrenador, (req, res) => {
	console.log(req.usuario);
	res.json({
		error: null,
		data: 'hola',
	});
});

router.post('/login', authController.login);
router.post('/register', authController.register);
//busqueda de usuarios
router.get('/',validarTodo, busqueda.getEntrenadoresAndClientes);
router.get('/trainers',validarTodo, busqueda.getEntrenadores);

module.exports = router;
