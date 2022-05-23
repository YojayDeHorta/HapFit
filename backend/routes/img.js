const router = require('express').Router();
const imgController = require('../controllers/imgs.js');
const multer = require('../middlewares/multer-img.js');
const validarTodo = require('../middlewares/validate-all');

router.post(
	'/updateLinkPerfil',
	[multer.single('img'), validarTodo],
	imgController.updateLinkPerfil
);
router.post(
	'/updateLinkEjercicio/:id',
	[multer.single('img'), validarTodo],
	imgController.updateLinkExercise
);
router.post('/add', [multer.single('img'), validarTodo], imgController.add);
module.exports = router;
