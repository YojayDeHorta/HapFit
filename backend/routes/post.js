const router = require('express').Router();
const publicaciones = require('../controllers/publicaciones');
const validarEntrenador = require('../middlewares/validate-entrenador');
const validarCliente = require('../middlewares/validate-cliente');
const validarTodo = require('../middlewares/validate-all');

router.post('/', validarTodo, publicaciones.addPublicacion);
router.get('/', validarTodo, publicaciones.getPublicacion);
router.delete('/', validarTodo, publicaciones.deletePublicacion);
//post por sesion usuario
router.get('/user', validarTodo, publicaciones.getPublicacionBySesion);
//post por id usuario
router.post('/user', validarTodo, publicaciones.getPublicacionByUser);

//likes
router.post('/setlikes', validarTodo, publicaciones.setLikes);

//comentarios
router.get(
	'/comentarios/:idPublicacion',
	validarTodo,
	publicaciones.getComentario
);
router.post('/comentarios', validarTodo, publicaciones.addComentario);
router.delete('/comentarios', validarTodo, publicaciones.deleteComentario);

module.exports = router;
