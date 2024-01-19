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
        "title": "Angular News",
        "body": "Newsletter Available!",
        "icon": "assets/main-page-logo-small-hat.png",
        "vibrate": [100, 50, 100],
        "data": {
            "dateOfArrival": Date.now(),
            "primaryKey": 1
        },
        "actions": [{
            "action": "explore",
            "title": "Go to the site"
        }]
    }
};
//ruteo
routes(app)

//end point para descargar cv
app.get('/descargar-cv', function (req, res) {
  const rutaArchivo = path.join(__dirname, 'public', 'cv-moises-mannarino.pdf');
      res.download(rutaArchivo);
      //res.sendFile(rutaArchivo);
});        

app.post('/notification', function (req, res) {
    webpush.sendNotification(req.body.subscription, JSON.stringify(notificationPayload)).catch(error => 
                            { console.error(error.stack); });
  }); 

//server escuchando
app.listen(process.env.PORT || 3000,()=>{
	console.log('programa almacen andando en el puerto '+ (process.env.PORT || 3000))
})