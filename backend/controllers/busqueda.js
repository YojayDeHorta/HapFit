const connection = require('../database/db');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);


exports.getEntrenadoresAndClientes = async (req, res) => {
	try {
        let usuarios=[]
        
        usuarios = await query(`SELECT * FROM usuario;`);
        let admin=null
		        
        for (let i = 0; i < usuarios.length; i++) {
            delete usuarios[i].contrasenia
            delete usuarios[i].correo
            delete usuarios[i].telefono
            const entrenador = await query(`SELECT * FROM entrenador WHERE usuario_idUsuario = ${usuarios[i].idUsuario}`);
            usuarios[i].esEntrenador=false
            
            if (entrenador[0]) {
                if (req.usuario.idCliente) {
                    let suscrito = await query(`SELECT * FROM suscripcion WHERE Cliente_idCliente = ${req.usuario.idCliente} and Entrenador_idEntrenador = ${entrenador[0].idEntrenador};`);
                     
                    if (suscrito[0]) {
                        usuarios[i].entrenadorContratado=true
                    }
                }
                usuarios[i].lugarExp=entrenador[0].lugarExp
                usuarios[i].mesesExp=entrenador[0].mesesExp
                usuarios[i].esEntrenador=true
                usuarios[i].idEntrenador=entrenador[0].idEntrenador
                // let suscripcion = await query(`SELECT * FROM suscripcion WHERE Entrenador_idEntrenador = ${entrenador[0].idEntrenador};`);
				// if (suscripcion[0]) usuarios[i].entrenadorContratado=true
            }else{
                const cliente = await query(`SELECT * FROM cliente WHERE usuario_idUsuario = ${usuarios[i].idUsuario}`);
                if (cliente[0]) usuarios[i].idCliente=cliente[0].idCliente
                else admin=i
            }
            
        }
        if(admin) usuarios.splice(admin, 1);
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
                let suscrito = await query(`SELECT * FROM suscripcion WHERE Cliente_idCliente = ${req.usuario.idCliente} and Entrenador_idEntrenador = ${entrenador[0].idEntrenador};`);
                // console.log(entrenador);
                if (!suscrito[0]) {
                    usuarios[i].lugarExp=entrenador[0].lugarExp
                    usuarios[i].mesesExp=entrenador[0].mesesExp
                    usuarios[i].idEntrenador=entrenador[0].idEntrenador
                    entrenadores.push(usuarios[i])
                }
            }
            
        }
        // console.log(entrenadores);
        /*
        let suscripciones=[]
        suscripciones = await query(`SELECT * FROM suscripcion WHERE Cliente_idCliente != ${req.usuario.idCliente};`);

        for (let i = 0; i < suscripciones.length; i++) {
                let solicitudEntrenador = await query(`SELECT * FROM entrenador  WHERE idEntrenador = ${suscripciones[i].Entrenador_idEntrenador};`);
                let Usuario = await query(`SELECT * FROM usuario  WHERE idUsuario = ${solicitudEntrenador[0].Usuario_idUsuario};`);
                suscripciones[i].nombre=Usuario[0].nombre
                suscripciones[i].linkPerfil=Usuario[0].linkPerfil
                suscripciones[i].idUsuario=Usuario[0].idUsuario
                suscripciones[i].idEntrenador=solicitudEntrenador[0].idEntrenador
        }*/
        // console.log(usuarios);
        res.json({ error: null, data: entrenadores })

	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
exports.getEntrenador = async (req, res) => {
	try {
        let usuario=[]
        usuario = await query(`SELECT * FROM usuario idUsuario = ${req.body.idUsuario}`);
        let entrenadores=[]
            
        delete usuario[0].contrasenia
        delete usuario[0].correo
        delete usuario[0].telefono

        const entrenador = await query(`SELECT * FROM entrenador WHERE Usuario_idUsuario = ${req.body.idUsuario}`);
        
        if (entrenador[0]) {
            let suscrito = await query(`SELECT * FROM suscripcion WHERE Cliente_idCliente = ${req.usuario.idCliente} and Entrenador_idEntrenador = ${entrenador[0].idEntrenador};`);
            if (!suscrito[0]) {
                usuario[0].entrenadorContratado=true
            }
            usuario[0].lugarExp=entrenador[0].lugarExp
            usuario[0].mesesExp=entrenador[0].mesesExp
            res.json({ error: null, data: usuario })
        }
            


	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
