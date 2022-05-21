const connection = require('../database/db');
const Joi = require('joi');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const dotenv = require('dotenv').config();


exports.getEntrenadoresAndClientes = async (req, res) => {
	try {
        let usuarios=[]
        
        usuarios = await query(`SELECT * FROM usuario;`);
        
		        
        for (let i = 0; i < usuarios.length; i++) {
            delete usuarios[i].contrasenia
            delete usuarios[i].correo
            delete usuarios[i].telefono
            const cliente = await query(`SELECT * FROM cliente WHERE usuario_idUsuario = ${usuarios[i].idUsuario}`);
            usuarios[i].esEntrenador=true
            if (cliente[0]) {
                usuarios[i].esEntrenador=false
            }
        }
        res.json({ error: null, data: usuarios })

	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};

exports.getEntrenadores = async (req, res) => {
	try {
        let usuarios=[]
        usuarios = await query(`SELECT * FROM usuario;`);
        let entrenadores=[]
        for (let i = 0; i < usuarios.length; i++) {
            
            delete usuarios[i].contrasenia
            delete usuarios[i].correo
            delete usuarios[i].telefono
            
            const entrenador = await query(`SELECT * FROM entrenador WHERE Usuario_idUsuario = ${usuarios[i].idUsuario}`);
            if (entrenador[0]) {
                entrenadores.push(usuarios[i])
            }
        }
        // console.log(usuarios);
        res.json({ error: null, data: entrenadores })

	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};