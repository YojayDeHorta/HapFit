const connection = require('../database/db');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const Joi = require('joi');

const schemaBilletera = Joi.object({
	correoPayPal: Joi.string().min(3).max(255).email(),
	saldo: Joi.number().min(1),
});

exports.add = async (req, res) => {
	try {
		const { error } = schemaBilletera.validate(req.body);
		if (error)
			return res.status(400).json({ error: 'error al crear la billetera' });

		if (!req.body.saldo) req.body.saldo = 0;

		const billetera = await query(
			`INSERT INTO billetera (idEntrenador,saldo,correoPayPal) VALUES
			 ('${req.usuario.idEntrenador}','${req.body.saldo}','${req.body.correoPayPal}');`
		);

		res.json({ error: null, data: 'ok' });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
exports.update = async (req, res) => {
	try {
		const { error } = schemaBilletera.validate(req.body);
		if (error)
			return res.status(400).json({ error: 'error al actulizar la billetera' });

		//console.log(req.usuario.idEntrenador);
		let billetera = await query(
			`SELECT * FROM billetera  WHERE idEntrenador = ${req.usuario.idEntrenador};`
		);

		//console.log(billetera[0]);
		if (!billetera[0]) return this.add(req, res);

		if (!req.body.correoPayPal)
			req.body.correoPayPal = billetera[0].correoPayPal;

		if (!req.body.saldo) req.body.saldo = billetera[0].saldo;
		else req.body.saldo = req.body.saldo + billetera[0].saldo;

		const actulizacion = await query(
			`UPDATE billetera SET saldo = '${req.body.saldo}', correoPayPal = '${req.body.correoPayPal}' WHERE idBilletera='${billetera[0].idBilletera}';`
		);

		res.json({ error: null, data: 'ok' });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
exports.get = async (req, res) => {
	try {
		let billetera = await query(
			`SELECT * FROM billetera  WHERE idEntrenador = ${req.usuario.idEntrenador};`
		);

		if (!billetera[0])
			return res.status(400).json({ error: 'error al ver la billetera' });

		res.json({ error: null, data: billetera });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: 'Error interno del servidor' });
	}
};
