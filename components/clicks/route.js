var express = require ('express')
var controller = require('./controller')
var router = express.Router()


//crear un click
router.post('/', async (req,res)=>{
	const Respuesta = await controller.crearClick(req,res)
	res.send(Respuesta)
})




module.exports= router