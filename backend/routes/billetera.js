const router = require('express').Router();
const billeteraController = require('../controllers/billetera.js');
const validarTodo = require('../middlewares/validate-all');

router.post('/add', validarTodo, billeteraController.add);
router.post('/update', validarTodo, billeteraController.update);
router.get('/get', validarTodo, billeteraController.get);

module.exports = router;
