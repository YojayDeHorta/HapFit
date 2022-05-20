const router = require('express').Router();
const imgController = require('../controllers/imgs.js');
const multer = require('../middlewares/multer-img.js');
const validarTodo = require('../middlewares/validate-all');

router.post(
	'/updateLinkPerfil',
	[multer.single('img'), validarTodo],
	imgController.updateLinkPerfil
);

module.exports = router;
