// Instancia del módulo importado de mongoose para la bbdd
const mongoose = require('mongoose');

// Método para la conexión a la bbdd
const DBConnection = async () => {
    
    // Bloque try/catch para ejecutar la conexión a la bbdd
    try {
        // Configurar modo strictQuery para la coincidencia del modelo de datos con el schema
        mongoose.set('strictQuery', true);
        // Conexión a bbdd mediante la dirección establecida en la variable correspondiente en el archivo .env
        await mongoose.connect(process.env.DB_URI);
        console.log('Conectado a la base de datos');
    } catch (error) {
        // En caso de haber error se lanza un new Error
        console.log(error);
        throw new Error('Error al conectar con la base de datos');
    };
};

// Exportación de módulo para la conexión a la bbdd
module.exports = {
    DBConnection
};
