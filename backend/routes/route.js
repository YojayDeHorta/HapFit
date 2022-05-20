const router = require('express').Router();
const authController = require('../controllers/autenticacion');
const validarCliente = require('../middlewares/validate-cliente');
const validarEntrenador = require('../middlewares/validate-entrenador');

router.get('/admin', validarEntrenador, (req, res) => {
	console.log(req.usuario);
	res.json({
		error: null,
		data: 'hola',
	});
});

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
