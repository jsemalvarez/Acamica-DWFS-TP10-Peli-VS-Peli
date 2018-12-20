const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cors());


const handlers = {
	competencias : require('./controllers/competenciasController'),
	votos : require('./controllers/votosController'),
	peliculas : require('./controllers/peliculasController'),
	generos : require('./controllers/generosController'),
	directores : require('./controllers/directoresController'),
	actores : require('./controllers/actoresController')
}

routes.setup(app,handlers);


const puerto = '8080';
app.listen(puerto, function () {
  console.log( `Escuchando en el puerto ${puerto}` );
});