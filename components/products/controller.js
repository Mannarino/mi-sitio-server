const modelo = require('./model.js')
const productsCtrl = {}
const moment = require('moment');
const helpers = require('./helpers')

productsCtrl.createProduct = async (req,res)=>{
	try{
		const title = req.body.title
		const price = req.body.price
		const description = req.body.description
		const image= helpers.procesarImagen(req,res)
		
		//crear producto
		const productoGuardado = await modelo.create({
			  title,
	    	price,
	    	description,
	    	image
		})
	
		return res.status(201).send(productoGuardado)
	}
	catch(error){
		console.log(error)
		return res.status(500).send({message:'error interno del servidor'})
	} 

}

productsCtrl.getProducts = async (req,res)=>{
	try{
		const productsGuardados = await modelo.find({})
		return productsGuardados
	}
	catch(error){
		console.log(error)
		return res.status(500).send({message:'error interno del servidor'})
	}
}

productsCtrl.getProduct = async (req,res)=>{
	try{
		const product = await modelo.find({ _id: req.params.id })
		return product
	}
	catch(error){
		console.log(error)
		return res.status(500).send({message:'error interno del servidor'})
	}
}
productsCtrl.putProduct = async (req,res)=>{
	try{
		  console.log(req.body)
		  if(req.body.cambioImagen === 'false')
		  	{ 
		  		  const { title, description, price } = req.body;

		        // Crear un objeto con los datos actualizados
		        const updatedProductData = {
		            title,
		            description,
		            price
		        };

		        // Actualizar el producto en la base de datos
		        const product = await modelo.findOneAndUpdate(
		            { _id: req.params.id },
		            { $set: updatedProductData },
		            { new: true }
		        );

		        return product;
		  	}else{
		  	const title = req.body.title;
				const price = req.body.price;
				const description = req.body.description;
				const image = helpers.procesarImagen(req,res)

				// Crear un objeto con las propiedades actualizadas
				const updatedProductData = {
				  title,
				  price,
				  description,
				  image
				};

				// Actualizar el producto en la base de datos
				const producto = await modelo.findOneAndUpdate(
				  { _id: req.params.id },
				  { $set: updatedProductData },
				  { new: true }
				);

				return producto;
		  	}
			
		
		
		
	}
	catch(error){
		console.log(error)
		return res.status(500).send({message:'error interno del servidor'})
	}
}
productsCtrl.deleteProduct = async (req,res)=>{
	try{
		const id = req.params.id
		console.log(id)
		const product = await modelo.deleteOne({_id:id})
		return product
	}
	catch(error){
		console.log(error)
		return res.status(500).send({message:'error interno del servidor'})
	}
}

module.exports = productsCtrl