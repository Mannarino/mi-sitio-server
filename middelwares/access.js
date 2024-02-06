var express = require ('express')
const obtenerValoresDeEntorno = require('./../environment/getEnvironment.js')
const config =obtenerValoresDeEntorno()

//solo verifica que sea un token valido
function verificarAcceso (req, res, next){
	
	try {
		 if (req.headers.password === config.APLICATION_PASSWORD) {
		 	next()
		 }else{
		 	return res.status(401).send({message:'access not valid'})
		 }

	   

	    
	}
	catch(error){

		
		return res.status(401).send({message:'token con error'})


	
	}
	
}

module.exports = verificarAcceso