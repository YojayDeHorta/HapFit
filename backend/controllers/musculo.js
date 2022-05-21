const connection = require('../database/db');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const dotenv = require('dotenv').config();
const Joi = require('joi');

const schemaMuscle = Joi.object({
	nombre: Joi.string().min(3).max(50).required(),
	grupoMuscular: Joi.string().min(3).max(50).required(),
});

exports.add = async (req, res) => {
	try {
		const { error } = schemaMuscle.validate(req.body);
		if (error)
			return res.status(400).json({ error: 'error de al agregar musculo' });

		const data = await query(
			`INSERT INTO musculo (nombre,grupoMuscular) VALUES ('${req.body.nombre}','${req.body.grupoMuscular}');`
		);

		res.json({ error: null, data: 'ok' });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
exports.list = async (req, res) => {
	try {
		const data = await query(`SELECT * FROM musculo;`);

		res.json({ error: null, data: data });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
