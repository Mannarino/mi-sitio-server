const mongoose = require('mongoose')

var clickSchema=  mongoose.Schema({
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
	  },
	categoria :{
		type: String
	  },
	site :{
		type: String
	  }
})

var modelClick = mongoose.model('click',clickSchema)

module.exports = modelClick