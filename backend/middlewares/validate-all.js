const jwt = require('jsonwebtoken')
const connection = require('../database/db');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

// middleware to validate token (rutas protegidas)
const verifyToken = async(req, res, next) => {
    const token = req.header('auth-token')
    
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.usuario = verified
        const cliente = await query(`SELECT * FROM cliente WHERE cliente.Usuario_idUsuario LIKE '%${verified.id}%';`);
        if(cliente[0]&&verified.rol=="cliente"){
            req.usuario.idCliente=cliente[0].idCliente
            next()
        }else{
            const entrenador = await query(`SELECT * FROM entrenador WHERE entrenador.Usuario_idUsuario LIKE '%${verified.id}%';`);
            if (!entrenador[0]||verified.rol!="entrenador") return res.status(400).json({ error: 'Error con el token' });
            req.usuario.idEntrenador=entrenador[0].idEntrenador

            next()
        }
                     
         // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

module.exports = verifyToken;