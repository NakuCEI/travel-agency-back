// Instancia para el módulo importado de jsonwebtoken
const jwt = require('jsonwebtoken');

// Mensajes de error
const tokenNotValid = 'Token no válido.';
const noTokenInRequest = 'No hay token en la petición.';

// Método para la gestión de token
const validateJWT = (req, res, next) => {
    // Instancia para el valor del token en el header de la petición
    const token = req.header('x-token');

    // Comprobación de existencia de token en la cabecera de la petición
    // En caso de no haberlo se lanza error
    if (!token) {
        console.log(`Error: ${noTokenInRequest}`);
        return res.status(401).json({
            ok: false, 
            msg: noTokenInRequest
        });
    };

    // Bloque try/catch para la comprobación de token
    try {
        // Instancia para la verificación de la validez del token mediante la clave secreta establecida en el archivo .env
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.uid = payload.uid;
        req.name = payload.name;
        
    } catch (error) {
        // Captura del error en la validación de token y devolución al carecer de credenciales válidas de autenticación para el recurso solicitado (Error 401)
        console.log(`Error - ${tokenNotValid}: ${error}`);
        return res.status(401).json({
            ok: false, 
            msg: tokenNotValid
        });
    };

    next();
};

// Exportación de módulo para la gestión de token
module.exports = {
    validateJWT 
};
