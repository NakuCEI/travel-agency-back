// Importar express
const express = require('express');
// Importar método para la conexión con la bbdd
const { DBConnection } = require('./database/config');
// Importar cors para el manejo de peticiones url
const cors = require('cors');
// Configuración de variables de entorno
require('dotenv').config();

// Constante para la instancia de servidor
const app = express();
// Constante para el puerto de escucha
const port = process.env.PORT || 3000;

// Conectar la bbdd
DBConnection();

// Asignación de cors a la aplicación
app.use(cors());

// Configuración de carpeta de renderizado de la aplicación
app.use(express.static(__dirname + '/public'));

// Asignación de json para el parseo de mensajes de la aplicación
app.use(express.json());

// Configuración de rutas de la aplicación
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

// Poner servidor a la escucha
app.listen(port,()=>{
    console.log(`Servidor a la escucha del puerto ${port}`);
});