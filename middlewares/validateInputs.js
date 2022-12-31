// Importar módulo validationResult para la validación desde express-validator
const { validationResult } = require("express-validator");

// Método para la validación de campos
const validateInputs = (req, res, next) => {
    
    // Instancia para almacenar los errores
    const errors = validationResult(req);
    
    // Comprobación de la existencia de errores
    if (!errors.isEmpty()) {
        // En caso de haber errores se devuelve un error 400 al no ser correctos los datos a procesar
        console.log(errors);
        return res.status(400).json({
            ok: false, 
            errors: errors.mapped()
        });
    };

    // Se continua con el siguiente elemento de la validación
    next();
};

// Exportación de módulo para la validación de campos
module.exports = {
    validateInputs
};
