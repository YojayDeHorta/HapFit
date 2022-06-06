const connection = require('../database/db');
const Joi = require('joi');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const cloudinary = require('../config/cloudinary.config.js');
var fs = require('fs');


exports.getSolicitudes = async (req, res) => {
	try {
        let solicitudes=[]
        solicitudes = await query(`SELECT * FROM solicitud;`);
        for (let i = 0; i < solicitudes.length; i++) {
            let solicitudCliente = await query(`SELECT * FROM cliente  WHERE idCliente = ${solicitudes[i].Cliente_idCliente};`);
            let Usuario = await query(`SELECT * FROM usuario  WHERE idUsuario = ${solicitudCliente[0].Usuario_idUsuario};`);
            solicitudes[i].nombre=Usuario[0].nombre
            solicitudes[i].linkPerfil=Usuario[0].linkPerfil
        }
        res.json({ error: null, data: solicitudes })

	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};

exports.setSolicitud= async (req, res) => {
	try {
        let result={}
        result.secure_url=null
        if (req.file.path) {
                result = await cloudinary.v2.uploader.upload(req.file.path);
                fs.unlinkSync(req.file.path);
        }
        
        let solicitudCliente = await query(`SELECT * FROM cliente  WHERE Usuario_idUsuario = ${req.usuario.id};`);
        if (!solicitudCliente[0]) return res.status(400).json({ error: 'cliente no encontrado' });

        let solicitud = await query(`SELECT * FROM solicitud  WHERE Cliente_idCliente = ${solicitudCliente[0].idCliente};`);
        if (solicitud[0])return res.status(400).json({ error: 'solicitud en proceso' });
        
        const savedSolicitud = await query(
        `INSERT INTO solicitud (estadoSolicitud,linkTitulos,lugarExp,mesesExp,descripcion,Cliente_idCliente) VALUES ('solicitud en proceso'
        ,'${result.secure_url}','${req.body.lugarExp}','${req.body.mesesExp}','${req.body.descripcion}',${solicitudCliente[0].idCliente});`
		);
        res.json({ error: null, data: 'solicitud enviada correctamente' })

	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
exports.aceptarSolicitud= async (req, res) => {
	try {
        
        let Solicitud =await query(`SELECT * FROM solicitud WHERE idSolicitud = ${req.body.idSolicitud} AND Cliente_idCliente = ${req.body.idCliente};`);
        await query(`DELETE FROM solicitud WHERE idSolicitud = ${req.body.idSolicitud} AND Cliente_idCliente = ${req.body.idCliente};`);
        let Cliente = await query(`SELECT * FROM cliente  WHERE idCliente = ${req.body.idCliente};`);
        if (!Cliente[0]) return res.status(400).json({ error: 'Error interno del servidor' });


        const savedEntrenador = await query(`INSERT INTO entrenador (linkTitulos,Usuario_idUsuario,lugarExp,mesesExp) 
        VALUES ('${req.body.linkTitulos}',${Cliente[0].Usuario_idUsuario},'${Solicitud[0].lugarExp}',${Solicitud[0].mesesExp});`);

        await query(`DELETE FROM cliente WHERE idCliente= ${req.body.idCliente}`);
        
        const billetera = await query(
                `INSERT INTO billetera (idEntrenador,saldo,correoPayPal) VALUES
                 ('${savedEntrenador.insertId}',0,null);`
        );
        res.json({ error: null, data: 'cliente cambiado a entrenador exitosamente' })

	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
exports.rechazarSolicitud= async (req, res) => {
	try {
        
        await query(`DELETE FROM solicitud WHERE idSolicitud = ${req.body.idSolicitud} AND Cliente_idCliente = ${req.body.idCliente};`);

        res.json({ error: null, data: 'borrado exitosamente' })

	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};