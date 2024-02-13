const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const routes = require('./routes.js')
const DBconection = require('./db.js')
const webpush = require('web-push')
const obtenerValoresDeEntorno = require('./environment/getEnvironment.js')
const config =obtenerValoresDeEntorno()

app.use(express.json());
app.use(cors())

app.use(express.static(path.join(__dirname, '/public')))

//conection base datos
DBconection()


webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    config.PUBLIC_KEY,
    config.PRIVATE_KEY
);
const notificationPayload = {
    "notification": {
        "title": "notificacion de prueba uno",
        "body": "esta es solo una notificacion de prueba",
        "icon": "https://quiet-pothos-1a4eb5.netlify.app/assets/piramide-1.jpg"
    }
};

const secondNotificationPayload = {
    "notification": {
        "title": " notificacion de prueba dos",
        "body": "esta es solo otra notificacion de prueba",
        "icon": "https://quiet-pothos-1a4eb5.netlify.app/assets/piramide-1.jpg"
        
    }
};

// configuracion fileUpload------
const fileUpload = require('express-fileupload');
// Configuración de límites de tamaño de archivo
app.use(fileUpload({
  limits: { fileSize: 4 * 1024 * 1024 } // 4 MB
}));

// configuracion fileUpload------ fin



//configuracion para servir archivos estaticos------
// Obtén la ruta absoluta de la carpeta de archivos estáticos
const uploadsPath = path.resolve(__dirname, 'uploads');
// Sirve archivos estáticos desde la ruta absoluta
app.use(express.static(uploadsPath));
//configuracion para servir archivos estaticos------fin 



//ruteo
routes(app)

       

app.post('/notification', function (req, res) {
    console.log(req.body.subscription)
    webpush.sendNotification(
        req.body.subscription, 
        JSON.stringify(notificationPayload)).catch(error => 
                            { console.error(error.stack); });

     setTimeout(() => {
        webpush.sendNotification(
            req.body.subscription,
            JSON.stringify(secondNotificationPayload)
        ).catch(error => {
            console.error("Error al enviar la segunda notificación:", error.stack);
        });
    }, 2 * 60 * 1000);
  }); 

//server escuchando
app.listen(process.env.PORT || 3000,()=>{
	console.log('programa almacen andando en el puerto '+ (process.env.PORT || 3000))
})