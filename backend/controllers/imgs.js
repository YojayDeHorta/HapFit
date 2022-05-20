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
			`SELECT * FROM usuario WHERE usuario.idUsuario LIKE '%${req.body.userId}%';`
		);
		if (!user[0])
			return res.status(400).json({ error: 'porfavor revisa tus datos' });

		await query(
			`UPDATE usuario SET linkPerfil='${result.secure_url}' WHERE usuario.idUsuario LIKE '%${req.body.userId}%';`
		);
		res.json({ error: null, data: 'Imagen subida' });
	} catch (error) {
		res.json({
			error: 'La imagen no se pudo subir',
		});
	}
};
