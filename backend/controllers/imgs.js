const connection = require('../database/db');
const multer = require('multer');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const dotenv = require('dotenv').config();
const cloudinary = require('../config/cloudinary.config.js');

exports.updateLinkPerfil = async (req, res) => {
	try {
		const file = req.file;
		const result = await cloudinary.v2.uploader.upload(req.file.path);
		const user = await query(
			`SELECT * FROM usuario WHERE usuario.idUsuario LIKE '%${req.usuario.id}%';`
		);
		if (!user[0])
			return res.status(400).json({ error: 'porfavor revisa tus datos' });

		await query(
			`UPDATE usuario SET linkPerfil='${result.secure_url}' WHERE usuario.idUsuario LIKE '%${req.usuario.id}%';`
		);
		res.json({ error: null, data: result.secure_url });
	} catch (error) {
		console.log(error);
		res.json({
			error: 'La imagen no se pudo subir',
		});
	}
};

exports.add = async (req, res) => {
	try {
		const file = req.file;
		const result = await cloudinary.v2.uploader.upload(req.file.path);

		res.json({ error: null, data: result.secure_url });
	} catch (error) {
		console.log(error);
		res.json({
			error: 'La imagen no se pudo subir',
		});
	}
};

exports.updateLinkExercise = async (req, res) => {
	try {
		const file = req.file;
		const result = await cloudinary.v2.uploader.upload(req.file.path);
		const ejercicio = await query(
			`SELECT * FROM ejercicio WHERE ejercicio.idEjercicio LIKE '%${req.params.id}%';`
		);
		if (!ejercicio[0])
			return res.status(400).json({ error: 'porfavor revisa tus datos' });

		await query(
			`UPDATE ejercicio SET linkEjercicio='${result.secure_url}' WHERE ejercicio.idEjercicio LIKE '%${req.params.id}%';`
		);
		res.json({ error: null, data: result.secure_url });
	} catch (error) {
		console.log(error);
		res.json({
			error: 'La imagen no se pudo subir',
		});
	}
};
