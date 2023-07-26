const enviarEmail = require('./helpers/enviarEmail.js')
const routerVisits = require('./components/visits/route.js')
const routerClicks = require('./components/clicks/route.js')

function routes(app) {
	
    app.use('/visits', routerVisits)
    app.use('/clicks', routerClicks)

   

	// Definir una ruta POST para recibir los datos del formulario
	app.post('/enviar-correo', (req, res) => {
	  let { mensaje, email } = req.body;
	  enviarEmail(email,mensaje)
	});
}

module.exports = routes