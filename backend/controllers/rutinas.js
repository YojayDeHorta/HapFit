const connection = require('../database/db');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const dotenv = require('dotenv').config();
const Joi = require('joi');

const schemaRoutine = Joi.object({
	descripcion: Joi.string().min(3).max(240).required().allow(null),
	idUsuario: Joi.allow(null).default(null),
	nombre: Joi.string().min(3).max(45),
	etiqueta: Joi.string().min(3).max(45).allow(null),
	idEjercicio: Joi.array().default(null),
});

exports.add = async (req, res) => {
	try {
		const { error } = schemaRoutine.validate(req.body);
		if (error) {
			console.log(error);
			return res.status(400).json({ error: 'error al crear la rutina' });
		}
		const rutina = await query(
			`INSERT INTO rutinas (Usuario_idUsuario,descripcion,nombre,etiqueta) VALUES ('${req.usuario.id}','${req.body.descripcion}','${req.body.nombre}','${req.body.etiqueta}');`
		);

		req.body.idEjercicio.forEach(async (idEjer) => {
			const relacion = await query(
				`INSERT INTO ejercicio_has_rutinas (Ejercicio_idEjercicio,Rutinas_idRutina) VALUES ('${idEjer}','${rutina.insertId}');`
			);
		});

		res.json({ error: null, data: 'ok' });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};

exports.get = async (req, res) => {
	try {
		console.log(req.usuario.id);
		let data = [];
		const rutina = await query(
			`SELECT * FROM rutinas WHERE Usuario_idUsuario LIKE '%${req.usuario.id}%';`
		);
		data.push(rutina);
		for (let index = 0; index < data.length; index++) {
			let ejercicio_rutina = await query(
				`SELECT * FROM ejercicio_has_rutinas WHERE Rutinas_idRutina LIKE '%${rutina[index].idRutina}%';`
			);
			// console.log('Ejercicio Rutina: ', ejercicio_rutina);
			// console.log('Exercise: ', exercise);
			for (let j = 0; j < ejercicio_rutina.length; j++) {
				let ejercicio = await query(
					`SELECT * FROM ejercicio WHERE idEjercicio LIKE '%${ejercicio_rutina[j].Ejercicio_idEjercicio}%';`
				);
				data[index].push(ejercicio[0]);
			}
		}
		// rutina.map(async (rutina) => {
		// 	ejercicio.map(async (ejercicio, index) => {
		// 		data.push(ejercicio[index]);
		// 	});
		// 	console.log(data);
		// });

		// console.log(exer);
		res.json({ error: null, data: data });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
