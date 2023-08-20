const mongoose = require('mongoose')

var productSchema=  mongoose.Schema({
	title: {
		type: String
	  },
	price: {
	    type: String
	  },
	description:{
		type: String
	  },
	image :{
		 type: String
         
	  }
})

var modelClick = mongoose.model('product',productSchema)

module.exports = modelClick