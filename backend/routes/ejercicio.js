const router = require('express').Router();
const ejercicioController = require('../controllers/ejercicio.js');
const multer = require('../middlewares/multer-img.js');
const validarTodo = require('../middlewares/validate-all');

router.post('/add', validarTodo, ejercicioController.add);

module.exports = router;
