var express = require ('express')
const obtenerValoresDeEntorno = require('./../../environment/getEnvironment.js')
const config =obtenerValoresDeEntorno()
var router = express.Router()
const verifyAccess = require('./../../middelwares/access')

// access
router.post('/login', async (req,res)=>{
	console.log(req.body)
	try {
		 if (req.body.password === config.APLICATION_PASSWORD) {
		 	res.json({login:true})
		 }else{
		 	return res.status(401).send({message:'access not valid'})
		 }

	   

	    
	}
	catch(error){

		
		return res.status(401).send({message:'token con error'})


	
	}
	
	

})



module.exports= router