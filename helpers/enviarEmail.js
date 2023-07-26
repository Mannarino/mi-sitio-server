const nodemailer = require('nodemailer');
const obtenerValoresDeEntorno = require('./../environment/getEnvironment.js')
const config =obtenerValoresDeEntorno()

function enviarCorreo(email,mensaje){
  mensajeAEnviar = mensaje+'el correo es: '+email
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
    text: mensajeAEnviar,
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
}

module.exports = enviarCorreo