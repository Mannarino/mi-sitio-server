const mongoose = require('mongoose')

var visitaSchema=  mongoose.Schema({
	country: {
		type: String
	  },
	city: {
	    type: String
	  },
	region:{
		type: String
	  },
	date :{
		 type: Date, // Cambiamos el tipo de dato a Date
         default: Date.now // Valor predeterminado: la fecha y hora actual
	  },
	ip :{
		type: String
	  }
})

var modelVisita = mongoose.model('visita',visitaSchema)

module.exports = modelVisita