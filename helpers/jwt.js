// Instancia para el módulo importado de jsonwebtoken
const jwt = require('jsonwebtoken');

// Variables 
const timeTokenExpires = '3h'; // Tiempo de duración del token
const errorTokenMessage = 'Error al generar el token'; // Mensaje de error

// Método para la generación el token
const JWTGenerator = (uid, name) => {

    return new Promise((resolve, reject) => {
        // Almacenamiento en instancia del id y nombre del usuario
        const payload = { uid, name };
        // Ejecución de método para generar el token mediante la clave secreta establecida en el archivo .env y establecimiento del tiempo de duración
        // En el resolve de la promesa se devuelve el token generado
        // En caso de haber error se notifica en el reject
        jwt.sign(
            payload, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: timeTokenExpires }, 
            (error, token) => {
                if (error) {
                    console.log(`Error - ${errorTokenMessage}: ${error}`);
                    reject(errorTokenMessage);
                }
                resolve(token);
            }
        );
        
    });
};

// Exportación de módulo para la generación el token
module.exports = {
    JWTGenerator
};
