const modelo = require('./model.js')
const clicksCtrl = {}

clicksCtrl.crearClick = async (req,res)=>{
	try{
		const country = req.body.country
		const city = req.body.city
		const region = req.body.region
		const ip = req.body.ip
		const categoria = req.body.categoria
        const site = req.body.site
		//crear visita
		const clickGuardado = await modelo.create({
			country,
	    	city,
	    	region,
	    	ip,
	    	categoria,
	    	site
		})
	
		return clickGuardado
	}
	catch(error){
		console.log(error)
		return res.status(500).send({message:'error interno del servidor'})
	}
}

module.exports = clicksCtrl