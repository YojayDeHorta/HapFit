const connection = require('../database/db');
const Joi = require('joi');
const util = require('util');
const e = require('cors');
const query = util.promisify(connection.query).bind(connection);
exports.getChat= async (req, res) => {
	try {
        let emisor = await query(`SELECT * FROM chat WHERE (usuarioQueEnvia = ${req.usuario.id} and usuarioQueRecibe = ${req.body.idOtroUsuario}) or(usuarioQueEnvia = ${req.body.idOtroUsuario} and usuarioQueRecibe = ${req.usuario.id}) order by idChat`);
        for (let i = 0; i < emisor.length; i++) {
            emisor[i].derecha=false
            if (emisor[i].usuarioQueEnvia==req.usuario.id) {
                emisor[i].derecha=true
            }
            let rutina = await query(`SELECT * FROM rutinas WHERE idRutina = ${emisor[i].idRutina} `);
            if (rutina[0]) {
                emisor[i].nombreRutina=rutina[0].nombre
                
            }
        }
        res.json({ error: null, data: emisor })

	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};