const Joi = require('joi');
const connection = require('../database/db');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const cloudinary = require('../config/cloudinary.config.js');

const schemaPublicacion = Joi.object({
	descripcion: Joi.string().min(3).max(255).required(),
	idRutina: Joi.allow(null).default(null),
});
const schemaComentario = Joi.object({
	descripcion: Joi.string().min(1).max(255).required(),
	idPublicacion: Joi.number().required(),
});
exports.getPublicacion = async (req, res) => {
	try {
		const data = await query(`SELECT * FROM publicacion order by idPublicacion desc;`);
		
		for (let i = 0; i < data.length; i++) {
			const usuario = await query(
				`SELECT * FROM usuario WHERE usuario.idUsuario LIKE '%${data[i].Usuario_idUsuario}%' ;`
			);
			//likes totales
			const likes = await query(
				`SELECT COUNT(*) FROM reaccion WHERE publicacion_idPublicacion = ${data[i].idPublicacion}`
			);
			//comentarios totales
			const comented = await query(
				`SELECT COUNT(*) FROM comentario WHERE publicacion_idPublicacion = ${data[i].idPublicacion}`
			);
			//likes dados
			const liked = await query(
				`SELECT * FROM reaccion WHERE usuario_idUsuario = ${req.usuario.id} AND publicacion_idPublicacion = ${data[i].idPublicacion}`
			);
			//si es entrenador
			const entrenador = await query(`SELECT * FROM entrenador WHERE usuario_idUsuario = ${data[i].Usuario_idUsuario}`);
            data[i].esEntrenador=false
            if (entrenador[0]) {
				data[i].idEntrenador=entrenador[0].idEntrenador
                data[i].esEntrenador=true
				
				data[i].lugarExp=entrenador[0].lugarExp
				data[i].mesesExp=entrenador[0].mesesExp
				if (req.usuario.idCliente) {
                    let suscrito = await query(`SELECT * FROM suscripcion WHERE Cliente_idCliente = ${req.usuario.idCliente} and Entrenador_idEntrenador = ${entrenador[0].idEntrenador};`);
                     
                    if (suscrito[0]) {
                        data[i].entrenadorContratado=true
                    }
                }

            }else{
				const cliente = await query(`SELECT * FROM cliente WHERE usuario_idUsuario = ${data[i].Usuario_idUsuario}`);
				if (cliente[0]) data[i].idCliente=cliente[0].idCliente
			}
			// const comentariosUsuario = await query(`SELECT * FROM comentario WHERE usuario_idUsuario = ${data[i].Usuario_idUsuario} AND publicacion_idPublicacion = ${data[i].idPublicacion}`);
			data[i].liked = false;
			if (liked[0]) data[i].liked = true;

			if (usuario[0]) {
				data[i].nombre = usuario[0].nombre;
				data[i].linkPerfil = usuario[0].linkPerfil;
				data[i].likes = likes[0]['COUNT(*)'];
				data[i].comented = comented[0]['COUNT(*)'];
			}
			//ver rutinas
			const rutina = await query(`SELECT * FROM rutinas WHERE idRutina = ${data[i].Rutinas_idtable1}`);
			if (rutina[0]) {
				data[i].nombreRutina=rutina[0].nombre
			}
		}	
		res.json({ error: null, data: data });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
exports.addPublicacion = async (req, res) => {
	try {
		const { error } = schemaPublicacion.validate(req.body);
		if (error) return res.status(400).json({ error: 'error de publicacion' });
		const data = await query(
			`INSERT INTO publicacion (descripcion,Usuario_idUsuario,Rutinas_idtable1) VALUES ('${req.body.descripcion}',${req.usuario.id},${req.body.idRutina});`
		);


		res.json({ error: null, data: 'ok' });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
exports.getPublicacionBySesion = async (req, res) => {
	try {
		const data = await query(
			`SELECT * FROM publicacion WHERE publicacion.Usuario_idUsuario LIKE '%${req.usuario.id}%';`
		);

		const usuario = await query(
			`SELECT * FROM usuario WHERE usuario.idUsuario LIKE '%${req.usuario.id}%';`
		);
		for (let i = 0; i < data.length; i++) {
			const likes = await query(
				`SELECT COUNT(*) FROM reaccion WHERE publicacion_idPublicacion = ${data[i].idPublicacion}`
			);
			const liked = await query(
				`SELECT * FROM reaccion WHERE usuario_idUsuario = ${req.usuario.id} AND publicacion_idPublicacion = ${data[i].idPublicacion}`
			);
			data[i].liked = false;
			if (liked[0]) data[i].liked = true;

			if (usuario[0]) {
				data[i].nombre = usuario[0].nombre;
				data[i].linkPerfil = usuario[0].linkPerfil;
				data[i].likes = likes[0]['COUNT(*)'];
			}
			const rutina = await query(`SELECT * FROM rutinas WHERE idRutina = ${data[i].Rutinas_idtable1}`);
			if (rutina[0]) {
				data[i].nombreRutina=rutina[0].nombre
			}
		}
		res.json({ error: null, data: data });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
exports.getPublicacionByUser = async (req, res) => {
	try {
		const data = await query(
			`SELECT * FROM publicacion WHERE publicacion.Usuario_idUsuario LIKE '%${req.body.idUsuario}%';`
		);

		const usuario = await query(
			`SELECT * FROM usuario WHERE usuario.idUsuario LIKE '%${req.body.idUsuario}%';`
		);
		for (let i = 0; i < data.length; i++) {
			const likes = await query(
				`SELECT COUNT(*) FROM reaccion WHERE publicacion_idPublicacion = ${data[i].idPublicacion}`
			);
			const liked = await query(
				`SELECT * FROM reaccion WHERE usuario_idUsuario = ${req.body.idUsuario} AND publicacion_idPublicacion = ${data[i].idPublicacion}`
			);
			data[i].liked = false;
			if (liked[0]) data[i].liked = true;

			if (usuario[0]) {
				data[i].nombre = usuario[0].nombre;
				data[i].linkPerfil = usuario[0].linkPerfil;
				data[i].likes = likes[0]['COUNT(*)'];
			}
			const rutina = await query(`SELECT * FROM rutinas WHERE idRutina = ${data[i].Rutinas_idtable1}`);
			if (rutina[0]) {
				data[i].nombreRutina=rutina[0].nombre
			}
		}
		res.json({ error: null, data: data });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
exports.deletePublicacion = async (req, res) => {
	try {
		await query(
			`DELETE FROM publicacion WHERE publicacion.idPublicacion = ${req.body.idPublicacion} AND publicacion.Usuario_idUsuario = ${req.usuario.id};`
		);
		res.json({ error: null, data: 'ok' });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
//likes
exports.setLikes = async (req, res) => {
	try {
		const data = await query(
			`SELECT * FROM reaccion WHERE reaccion.Publicacion_idPublicacion = ${req.body.idPublicacion} AND reaccion.Usuario_idUsuario = ${req.usuario.id};`
		);
		if (data[0]) {
			await query(
				`DELETE FROM reaccion WHERE reaccion.Publicacion_idPublicacion = ${req.body.idPublicacion} AND reaccion.Usuario_idUsuario = ${req.usuario.id};`
			);
		} else {
			await query(
				`INSERT INTO reaccion (meGusta,Publicacion_idPublicacion,Usuario_idUsuario) VALUES (1,${req.body.idPublicacion},${req.usuario.id});`
			);
		}
		res.json({ error: null, data: 'ok' });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
//comentarios
exports.getComentario = async (req, res) => {
	try {
		const comentarios = await query(
			`SELECT * FROM comentario WHERE publicacion_idPublicacion = ${req.params.idPublicacion}`
		);
		for (let i = 0; i < comentarios.length; i++) {
			const usuario = await query(
				`SELECT * FROM usuario WHERE usuario.idUsuario LIKE '%${comentarios[i].Usuario_idUsuario}%';`
			);
			if (usuario[0]) {
				comentarios[i].nombre = usuario[0].nombre;
				comentarios[i].linkPerfil = usuario[0].linkPerfil;
			}
		}
		res.json({ error: null, data: comentarios });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
exports.addComentario = async (req, res) => {
	try {
		const { error } = schemaComentario.validate(req.body);
		if (error) return res.status(400).json({ error: 'error de comentario' });
		const data = await query(
			`INSERT INTO comentario (descripcion,Usuario_idUsuario,Publicacion_idPublicacion) VALUES ('${req.body.descripcion}',${req.usuario.id},${req.body.idPublicacion});`
		);
		res.json({ error: null, data: 'ok' });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
exports.deleteComentario = async (req, res) => {
	try {
		await query(
			`DELETE FROM comentario WHERE comentario.idComentario = ${req.body.idComentario} AND comentario.Usuario_idUsuario = ${req.usuario.id};`
		);
		res.json({ error: null, data: 'ok' });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
