const express = require('express')
const app = express()
const path = require('path')
var cors = require('cors')
const nodemailer = require('nodemailer');
const obtenerValoresDeEntorno = require('./environment/getEnvironment.js')
const config =obtenerValoresDeEntorno()

app.use(express.json());
app.use(cors())

app.use(express.static(path.join(__dirname, '/public')))

//servir pagina base
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})


// Configurar una ruta para enviar el archivo index.html en todas las rutas excepto /descargar-archivo
app.get('*', (req, res, next) => {
  if (req.path !== '/descargar-cv') {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  } else {
    next();
  }
});

//end point para descargar cv
app.get('/descargar-cv', function (req, res) {
	const rutaArchivo = path.join(__dirname, 'public', 'cv-moises-mannarino.pdf');
    res.download(rutaArchivo);
    //res.sendFile(rutaArchivo);
});

// Definir una ruta POST para recibir los datos del formulario
app.post('/enviar-correo', (req, res) => {
  let { mensaje, email } = req.body;
  mensaje = mensaje+'el correo es: '+email
  // Configurar el transporte de nodemailer
  const transporter = nodemailer.createTransport({
    // Configura aquí los detalles de tu servidor de correo saliente (SMTP)
    // Puedes usar servicios como Gmail, Outlook, etc., o configurar tu propio servidor SMTP
    service: 'SMTP',
    host: 'smtp.office365.com',
    port:587,
    secure:false,
    requireTLS:true,
    auth: {
      user: config.USER_HOTMAIL_SMTP,
      pass: config.PASS_HOTMAIL_SMTP
    },
  });
  
  // Configurar el contenido del correo electrónico
  const mailOptions = {
    from: 'angular.moises82@outlook.com',
    to: 'angular.moises82@gmail.com',
    subject: 'Nuevo mensaje del formulario',
    text: mensaje,
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Ocurrió un error al enviar el correo electrónico.');
    } else {
      console.log('Correo electrónico enviado:', info.response);
      res.status(200).send({messaje:'¡El correo electrónico ha sido enviado con éxito!'});
    }
  });
});




//server escuchando
app.listen(process.env.PORT || 3000,()=>{
	console.log('programa almacen andando en el puerto '+ (process.env.PORT || 3000))
})