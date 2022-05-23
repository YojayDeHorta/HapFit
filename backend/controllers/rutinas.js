const connection = require('../database/db');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const dotenv = require('dotenv').config();
const Joi = require('joi');

const schemaExercise = Joi.object({
	descripcion: Joi.string().min(3).max(240).required(),
	idUsuario: Joi.allow(null).default(null),
	nombre: Joi.string().min(6).max(45),
	etiqueta: Joi.string().min(6).max(45),
});

exports.add = async (req, res) => {
	try {
		const { error } = schemaExercise.validate(req.body);
		if (error)
			return res.status(400).json({ error: 'error al crear el ejercicio' });
		const rutina = await query(
			`INSERT INTO rutinas (Usuario_idUsuario,descripcion,nombre,etiqueta) VALUES ('${req.usuario.id}','${req.body.descripcion}','${req.body.nombre}','${req.body.etiqueta}');`
		);
		const relacion = await query(
			`INSERT INTO ejercicio_has_rutinas (Ejercicio_idEjercicio,Rutinas_idRutina) VALUES ('${rutina.insertId}','${req.body.idMusculo}');`
		);

		res.json({ error: null, data: 'ok' });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
