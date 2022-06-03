const connection = require('../database/db');
const Joi = require('joi');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

exports.setSuscripcion= async (req, res) => {
	try {
        const setSuscripcion = await query(
            `INSERT INTO suscripcion  (precio,fechaInicio,fechaFinal,Entrenador_idEntrenador,Cliente_idCliente,Plan_idPlan) VALUES (
           ${req.body.precio},'${req.body.fechaInicio}','${req.body.fechaFinal}','${req.body.idEntrenador}','${req.usuario.idCliente}','${req.body.idPlan}');`
            )
        res.json({ error: null, data: "Plan comprado exitosamente!" })

	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
//clientes
exports.getClientesContratados= async (req, res) => {
	try {
        let suscripciones=[]
        suscripciones = await query(`SELECT * FROM suscripcion WHERE Entrenador_idEntrenador = ${req.usuario.idEntrenador};`);
        for (let i = 0; i < suscripciones.length; i++) {
            let solicitudCliente = await query(`SELECT * FROM cliente  WHERE idCliente = ${suscripciones[i].Cliente_idCliente};`);
            let Usuario = await query(`SELECT * FROM usuario  WHERE idUsuario = ${solicitudCliente[0].Usuario_idUsuario};`);
            suscripciones[i].nombre=Usuario[0].nombre
            suscripciones[i].linkPerfil=Usuario[0].linkPerfil
        }
        res.json({ error: null, data: suscripciones })

	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
//entrenadores
exports.getEntrenadoresContratados = async (req, res) => {
	try {
                let suscripciones=[]
                suscripciones = await query(`SELECT * FROM suscripcion WHERE Cliente_idCliente = ${req.usuario.idCliente};`);
                for (let i = 0; i < suscripciones.length; i++) {
                        let solicitudEntrenador = await query(`SELECT * FROM entrenador  WHERE idEntrenador = ${suscripciones[i].Entrenador_idEntrenador};`);
                        let Usuario = await query(`SELECT * FROM usuario  WHERE idUsuario = ${solicitudEntrenador[0].Usuario_idUsuario};`);
                        suscripciones[i].nombre=Usuario[0].nombre
                        suscripciones[i].linkPerfil=Usuario[0].linkPerfil
                        suscripciones[i].idUsuario=Usuario[0].idUsuario
                        suscripciones[i].idEntrenador=solicitudEntrenador[0].idEntrenador
                        suscripciones[i].entrenadorContratado=true
                }

                res.json({ error: null, data: suscripciones })


	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
//planes
exports.getPlanes= async (req, res) => {
	try {
        let solicitudes=[]
        if (req.usuario.idEntrenador) {
                solicitudes = await query(`SELECT * FROM plan WHERE idEntrenador = ${req.usuario.idEntrenador};`);
        }else{

                entrenador = await query(`SELECT * FROM entrenador WHERE usuario_idUsuario = ${req.params.idUsuario};`);  
                if (entrenador[0]) {
                        solicitudes = await query(`SELECT * FROM plan WHERE idEntrenador = ${entrenador[0].idEntrenador};`);    
                }    
                  
        }
        res.json({ error: null, data: solicitudes })

	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
exports.setPlanes= async (req, res) => {
	try {
        const savedSolicitud = await query(
        `INSERT INTO plan (nombre,precio,descripcion,idEntrenador) VALUES (
        '${req.body.nombre}',${req.body.precio},'${req.body.descripcion}','${req.usuario.idEntrenador}');`
        )
        res.json({ error: null, data: "plan agregado exitosamente" })

	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
exports.deletePlanes= async (req, res) => {
	try {
        await query(
            `DELETE FROM plan WHERE idPlan = ${req.body.idPlan} AND idEntrenador = ${req.usuario.idEntrenador};`
        );
        res.json({ error: null, data: "plan borrado exitosamente" })

	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};