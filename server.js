// llamando al Framework express
const express = require('express')
const jsonwebtoken = require("jsonwebtoken")
const mysql = require('mysql') // llamando a la conexion mysql
const myconn = require('express-myconnection')




// Dependencias de las rutas para direccionarlas
const routes = require('./routes')
const rutaalumnos = require('./rutaalumnos')
const rutaaula = require('./rutaaula')
const rutaclases = require('./rutaclases')

const app = express()

// Creacion del puerto para la conexion y mas abajo la conexion a la base de datos (mysql)
app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'datos',
}

// Middlewars ----------------
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
const rutasProtegidas = express.Router(); // Token
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });

// Rutas ---------------------------------------------------------------------

app.post('/autenticar', (req, res) => { // Peticion de token para comprobar
    if(req.body.usuario === "asfo" && req.body.contrasena === "holamundo") {
  const payload = {
   check:  true
  };
  const token = jwt.sign(payload, app.get('llave'), {
   expiresIn: 1440
  });
  res.json({
   mensaje: 'Autenticación correcta',
   token: token
  });
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
})
// Uso de la ruta de alumnos
app.use('/alumnos', rutaalumnos)

// Uso de la ruta de profesores
app.use('/api', routes)

// Uso de la ruta de las aulas
app.use('/aulas', rutaaula)

// Uso de la ruta de las clases y horario general 
app.use('/clases', rutaclases)

// Ruta de token
app.get('/datos', rutasProtegidas, (req, res) => {
    const datos = [
     { id: 1, nombre: "Asfo" },
     { id: 2, nombre: "Denisse" },
     { id: 3, nombre: "Carlos" }
    ];
    
    res.json(datos);
   });


//Corriendo el servidor ------------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})

bodyParser = require('body-parser') // Dependencias de token
config = require('./configs/config') // Dependencias de carpetas

// 1
app.set('llave', config.llave);
// 2
app.use(bodyParser.urlencoded({ extended: true }));
// 3
app.use(bodyParser.json());
// 4
app.get('/', function(req, res) {
    res.send('Inicio del puerto REST API CRUD');
});