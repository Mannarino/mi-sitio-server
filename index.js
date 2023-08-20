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

       

//server escuchando
app.listen(process.env.PORT || 3000,()=>{
	console.log('programa almacen andando en el puerto '+ (process.env.PORT || 3000))
})