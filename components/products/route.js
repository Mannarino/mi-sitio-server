var express = require ('express')
var controller = require('./controller')
var router = express.Router()
const verifyAccess = require('./../../middelwares/access')

//crear producto
router.post('/',verifyAccess, async (req,res)=>{
	const Respuesta = await controller.createProduct(req,res)
	

})

//obtener productos
router.get('/', async (req,res)=>{
	const Respuesta = await controller.getProducts(req,res)
	res.send(Respuesta)
})

//eliminar producto
router.delete('/:id',verifyAccess,async(req,res)=>{ 
	let response = await controller.deleteProduct(req,res)
    res.send(response)    
})

//obtener producto
router.get('/:id',async(req,res)=>{ 
	let response = await controller.getProduct(req,res)
    res.send(response)    
})

//actualizar producto
router.put('/:id',verifyAccess,async(req,res)=>{ 
	let response = await controller.putProduct(req,res)
    res.send(response)    
})

module.exports= router