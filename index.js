const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const routes = require('./routes.js')
const DBconection = require('./db.js')

app.use(express.json());
app.use(cors())

app.use(express.static(path.join(__dirname, '/public')))

//conection base datos
DBconection()


//ruteo
routes(app)

//end point para descargar cv
app.get('/descargar-cv', function (req, res) {
  const rutaArchivo = path.join(__dirname, 'public', 'cv-moises-mannarino.pdf');
      res.download(rutaArchivo);
      //res.sendFile(rutaArchivo);
});        

//server escuchando
app.listen(process.env.PORT || 3000,()=>{
	console.log('programa almacen andando en el puerto '+ (process.env.PORT || 3000))
})