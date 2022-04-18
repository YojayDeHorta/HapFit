const router = require('express').Router();
const authController = require('../controllers/autenticacion');
const validateToken = require('../controllers/validate-token');

router.get('/admin', validateToken, (req, res) => {
	console.log('hola');
	res.json({
		error: null,
		data: 'hola',
	});
});

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
