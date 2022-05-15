const Joi = require('joi');
const connection = require('../database/db');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const schemaPublicacion = Joi.object({
    descripcion: Joi.string().min(3).max(255).required()
})
exports.getPublicacion= async (req,res)=>{
    try {
        const data = await query(`SELECT * FROM publicacion;`);
        res.json({error: null,data: data})
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: 'Error interno del servidor'})
    }
   
}
exports.addPublicacion= async (req,res)=>{
    try {
        const { error } = schemaPublicacion.validate(req.body)
        if (error) return res.status(400).json({error: 'error de publicacion'})
        const savedUser = await query(
			`INSERT INTO publicacion (descripcion) VALUES ('${req.body.descripcion}');`
		);
            //en proceso
        res.json({error: null,data: 'ok'})
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: 'Error interno del servidor'})
    }
   
}

exports.deletePublicacion= async (req,res)=>{
    try {
        res.json({error: null,data: 'ok'})
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: 'Error interno del servidor'})
    }
   
}