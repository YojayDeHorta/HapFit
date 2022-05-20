const router = require('express').Router();
const imgController = require('../controllers/imgs.js');
const multer = require('../middlewares/multer-img.js');

router.post(
	'/updateLinkPerfil',
	multer.single('img'),
	imgController.updateLinkPerfil
);

module.exports = router;
