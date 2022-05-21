const router = require('express').Router();
const muscleController = require('../controllers/musculo.js');
//const validarAdmin = require('../middlewares/validate-all');

router.post('/add', muscleController.add);
router.get('/list', muscleController.list);

module.exports = router;
