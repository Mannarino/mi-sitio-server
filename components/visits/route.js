var express = require ('express')
var controller = require('./controller')
var router = express.Router()


//crear una visita
router.post('/', async (req,res)=>{
	const Respuesta = await controller.crearVisita(req,res)
	res.send(Respuesta)
})




module.exports= router