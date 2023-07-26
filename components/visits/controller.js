const modelo = require('./model.js')
const visitsCtrl = {}

visitsCtrl.crearVisita = async (req,res)=>{
	try{
		const country = req.body.country
		const city = req.body.city
		const region = req.body.region
		const ip = req.body.ip;
        
		//crear visita
		const visitaGuardada = await modelo.create({
			country,
	    	city,
	    	region,
	    	ip
		})
	
		return visitaGuardada
	}
	catch(error){
		console.log(error)
		return res.status(500).send({message:'error interno del servidor'})
	}
}


module.exports = visitsCtrl