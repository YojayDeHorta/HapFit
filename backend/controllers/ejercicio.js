const connection = require('../database/db');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const dotenv = require('dotenv').config();
const Joi = require('joi');
const cloudinary = require('../config/cloudinary.config.js');

const schemaExercise = Joi.object({
	descripcion: Joi.string().min(3).max(240).required(),
	idUsuario: Joi.allow(null).default(null),
	link: Joi.string().min(6).max(1024),
	tiempo: Joi.number().default(0).required(),
	repeticiones: Joi.number().default(0).required(),
	publico: Joi.boolean().required(),
});

exports.add = async (req, res) => {
	try {
		let linkGif =
			'https://res.cloudinary.com/doinyijpk/image/upload/v1653178649/qpemn1t9lbpswu6jyemj.jpg';
		const { error } = schemaExercise.validate(req.body);
		if (typeof req.body.link !== null) linkGif = req.body.link;
		if (error)
			return res.status(400).json({ error: 'error al crear el ejercicio' });
		const data = await query(
			`INSERT INTO ejercicio (descripcion,Usuario_idUsuario,linkEjercicio,tiempo,repeticiones,publico) VALUES ('${req.body.descripcion}','${req.usuario.id}','${linkGif}','${req.body.tiempo}','${req.body.repeticiones}','${req.body.publico}');`
		);

		res.json({ error: null, data: 'ok' });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
