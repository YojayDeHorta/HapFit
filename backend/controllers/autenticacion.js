const Joi = require('joi');
const connection = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const { log } = require('console');
const query = util.promisify(connection.query).bind(connection);

const schemaRegister = Joi.object({
	nombre: Joi.string().min(3).max(255).required(),
	email: Joi.string().min(3).max(255).required().email(),
	telefono: Joi.number().required(),
	link: Joi.string().min(6).max(1024).required(),
	password: Joi.string().min(6).max(1024).required(),
});

const schemaLogin = Joi.object({
	email: Joi.string().min(6).max(255).required().email(),
	password: Joi.string().min(6).max(1024).required(),
});

exports.register = async (req, res) => {
	// validate user
	const { error } = schemaRegister.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });

	const isEmailExist = await query(
		`SELECT * FROM usuario WHERE usuario.correo LIKE '%${req.body.email}%';`
	);
	console.log(isEmailExist);
	if (isEmailExist.length)
		//Si el email existe
		return res.status(400).json({ error: 'Email ya registrado' });

	// hash contraseña
	const salt = await bcrypt.genSalt(10);
	const passwordEncrypt = await bcrypt.hash(req.body.password, salt);
	try {
		const savedUser = await query(
			`INSERT INTO usuario (nombre,correo,telefono,linkPerfil,contrasenia) VALUES ('${req.body.nombre}','${req.body.email}','${req.body.telefono}','${req.body.link}', '${passwordEncrypt}');`
		);
		console.log(savedUser.insertId);
		const savedCliente = await query(
			`INSERT INTO cliente (Usuario_idUsuario) VALUES (${savedUser.insertId});`
		);
		res.json({ error: null, data: 'ok!' });
	} catch (error) {
		console.log(error);
		res.status(400).json({ error });
	} finally {
		// connection.end();
	}
};

exports.login = async (req, res) => {
	// validaciones
	const { error } = schemaLogin.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });

	const user = await query(
		`SELECT * FROM usuario WHERE usuario.correo LIKE '%${req.body.email}%';`
	);
	if (!user) return res.status(400).json({ error: 'Email no encontrado' });

	console.log(user[0]);
	console.log(req.body);
	const validPassword = await bcrypt.compare(
		req.body.password,
		user[0].contrasenia
	);
	if (!validPassword)
		return res.status(400).json({ error: 'contraseña no válida' });
	
	//miramos los roles
	
	//si es cliente
	const cliente = await query(
		`SELECT * FROM cliente WHERE cliente.Usuario_idUsuario LIKE '%${user[0].idUsuario}%';`
	);
	let token=null
	let rol=null
	console.log(cliente);
	if (cliente[0]) {
		rol="cliente"
		token = jwt.sign({correo: user[0].correo,rol:rol},process.env.TOKEN_SECRET);
	}else{
		const entrenador = await query(
			`SELECT * FROM entrenador WHERE entrenador.Usuario_idUsuario LIKE '%${user[0].idUsuario}%';`
		);
		if(!entrenador[0]) return res.status(400).json({ error: 'usuario no encontrado' });
		rol="entrenador"
		token = jwt.sign({correo: user[0].correo,rol:rol},process.env.TOKEN_SECRET);
	}
	// creamos el token
	res.header('auth-token', token).json({
		error: null,
		data: { token },
		rol:rol
	});
};
