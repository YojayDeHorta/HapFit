const router = require('express').Router();
const ejercicioController = require('../controllers/ejercicio.js');
const multer = require('../middlewares/multer-img.js');
const validarTodo = require('../middlewares/validate-all');

router.post(
	'/add',
	[multer.single('gif'), validarTodo],
	ejercicioController.add
);

router.get('/', validarTodo, ejercicioController.get);
router.get(
	'/getEjercicioRutina/:idRutina',
	validarTodo,
	ejercicioController.getEjercicioRutina
);

module.exports = router;
