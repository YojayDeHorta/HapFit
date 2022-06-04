const router = require('express').Router();
const chat = require('../controllers/chat.js');
const validarTodo = require('../middlewares/validate-all');


router.post('/', validarTodo, chat.getChat);

module.exports = router;