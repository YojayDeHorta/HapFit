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

        const user = await query(`SELECT * FROM usuario WHERE usuario.correo LIKE '%${verified.correo}%';`);
        if (!user[0])return res.status(400).json({ error: 'Email no encontrado' });
        const cliente = await query(`SELECT * FROM cliente WHERE cliente.Usuario_idUsuario LIKE '%${user[0].idUsuario}%';`);
        if(!cliente[0]||verified.rol!="cliente")return res.status(400).json({ error: 'Error con el token' });
            
        next()
             
        console.log(req.usuario);
        
         // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

module.exports = verifyToken;