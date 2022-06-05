const connection = require('../database/db');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const dotenv = require('dotenv').config();
const Joi = require('joi');
const cloudinary = require('../config/cloudinary.config.js');
var fs = require('fs');

const schemaExercise = Joi.object({
	nombre: Joi.string().min(3).max(100).required(),
	descripcion: Joi.string().min(3).max(240).required(),
	idMusculo: Joi.number().required(),
	idUsuario: Joi.allow(null).default(null),
	tiempo: Joi.number().default(0).required(),
	repeticiones: Joi.number().default(0).required(),
	sets: Joi.number().default(0).required(),
	descanso: Joi.number().default(0).required(),
	publico: Joi.number().required(),
	idMusculo: Joi.allow(null).default(null).required(),
});

exports.add = async (req, res) => {
	try {
		const { error } = schemaExercise.validate(req.body);
		if (error)
			return res.status(400).json({ error: 'error al crear el ejercicio' });

		let linkGif =
			'https://res.cloudinary.com/doinyijpk/image/upload/v1653178649/qpemn1t9lbpswu6jyemj.jpg';
		if (req.file.path) {
			let result = await cloudinary.v2.uploader.upload(req.file.path);
			fs.unlinkSync(req.file.path);
			linkGif = result.secure_url;
		}

		const ejercicio = await query(
			`INSERT INTO ejercicio (nombre,descripcion,Usuario_idUsuario,linkEjercicio,tiempo,repeticiones,sets,descanso,publico) VALUES
			 ('${req.body.nombre}','${req.body.descripcion}','${req.usuario.id}','${linkGif}',${req.body.tiempo},${req.body.repeticiones}
			 ,${req.body.sets},${req.body.descanso},${req.body.publico});`
		);
		const relacion = await query(
			`INSERT INTO ejercicio_has_musculo (Ejercicio_idEjercicio,Musculo_idMusculo) VALUES ('${ejercicio.insertId}','${req.body.idMusculo}');`
		);

		res.json({ error: null, data: 'ok' });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};

exports.get = async (req, res) => {
	try {
		let ejercicios = await query(
			`SELECT * FROM ejercicio  WHERE usuario_idUsuario = ${req.usuario.id};`
		);
		for (let i = 0; i < ejercicios.length; i++) {
			let musculosID = await query(
				`SELECT * FROM ejercicio_has_musculo  WHERE Ejercicio_idEjercicio = ${ejercicios[i].idEjercicio};`
			);
			let musculos = await query(
				`SELECT * FROM musculo  WHERE idMusculo = ${musculosID[0].Musculo_idMusculo};`
			);

			ejercicios[i].idMusculo = musculos[0].idMusculo;
			ejercicios[i].nombreMusculo = musculos[0].nombre;
		}
		res.json({ error: null, data: ejercicios });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};

exports.getEjercicioRutina = async (req, res) => {
	try {
		const idRutina = req.params.idRutina;
		//console.log(idRutina);
		const data = [];

		const rutina = await query(
			`SELECT * FROM rutinas WHERE  idRutina LIKE '%${idRutina}%';`
			// `SELECT * FROM rutinas WHERE Usuario_idUsuario LIKE '%${req.usuario.id}%' AND idRutina LIKE '%${idRutina}%';`
		);

		if (!rutina[0])
			return res.status(400).json({ error: 'Verifique la rutina del clinete' });

		let ejercicio_rutina = await query(
			`SELECT * FROM ejercicio_has_rutinas WHERE Rutinas_idRutina LIKE '%${idRutina}%';`
		);
		// console.log('Ejercicio Rutina: ', ejercicio_rutina);
		// console.log('Exercise: ', exercise);
		if (ejercicio_rutina[0]) {
			for (let j = 0; j < ejercicio_rutina.length; j++) {
				let ejercicio = await query(
					`SELECT * FROM ejercicio WHERE idEjercicio LIKE '%${ejercicio_rutina[j].Ejercicio_idEjercicio}%';`
				);
				// console.log('Exercise: ', ejercicio);

				let ejercicioMusculo = await query(
					`SELECT * FROM ejercicio_has_musculo WHERE Ejercicio_idEjercicio LIKE '%${ejercicio[0].idEjercicio}%';`
				);
				if (ejercicioMusculo[0]) {
					let musculo = await query(
						`SELECT * FROM musculo WHERE idMusculo LIKE '%${ejercicioMusculo[0].Musculo_idMusculo}%';`
					);
					ejercicio[0].nombreMusculo = musculo[0].nombre;
					ejercicio[0].nombreRutina=rutina[0].nombre
				}
				data.push(ejercicio[0]);
			}
		}
		res.json({ error: null, data: data });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
