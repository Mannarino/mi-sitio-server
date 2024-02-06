const enviarEmail = require('./helpers/enviarEmail.js')

const routerProducts = require('./components/products/route.js')
const routerUser = require('./components/user/route.js')

function routes(app) {
	
    
    app.use('/products', routerProducts)
    app.use('/users', routerUser)
   

	// Definir una ruta POST para recibir los datos del formulario
	app.post('/enviar-correo', (req, res) => {
	  let { mensaje, email } = req.body;
	  enviarEmail(email,mensaje)
	});
}

module.exports = routes