const Joi = require('joi');
const connection=require("../database/db")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  
const util = require('util');
const { log } = require('console');
const query = util.promisify(connection.query).bind(connection);

const schemaRegister = Joi.object({
    nombre: Joi.string().min(3).max(255).required(),
    correo: Joi.string().min(3).max(255).required().email(),
    telefono: Joi.number().required(),
    link: Joi.string().min(6).max(1024).required(),
    password: Joi.string().min(6).max(1024).required(),
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

exports.register= async (req,res)=>{
    // validate user
    const { error } = schemaRegister.validate(req.body)
    if (error) 
        return res.status(400).json({error: error.details[0].message})

    const isEmailExist = await query(`SELECT * FROM usuario WHERE usuario.correo LIKE '%${req.body.email}%';`)
    if (isEmailExist.length) //Si el email existe
        return res.status(400).json({error: 'Email ya registrado'})
    
    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypt = await bcrypt.hash(req.body.password, salt);
    try {
        const savedUser = await query(`INSERT INTO usuario (nombre,correo,telefono,linkPerfil,password) VALUES ('${req.body.nombre}','${req.body.correo}','${req.body.telefono}','${req.body.link}', '${passwordEncrypt}');`);

        res.json({ error: null,data: 'ok!'})
    } catch (error) {
        res.status(400).json({error})
    } finally {
        // connection.end();
    }
}

exports.login= async (req,res)=>{
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const user = await query(`SELECT * FROM usuario WHERE usuario.correo LIKE '%${req.body.email}%';`)
    if (!user) return res.status(400).json({ error: 'Email no encontrado' });

    console.log(user[0]);

    const validPassword = await bcrypt.compare(req.body.password, user[0].password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
    
    // creamos el token
    const token = jwt.sign({
        name: user.name
    }, process.env.TOKEN_SECRET)
    
    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })  

}
