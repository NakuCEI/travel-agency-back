// Instancia para el módulo importado de moment
const moment = require('moment');

// Método para la verificación de fecha
const isDate = (value) => {
    // Si no hay valor se devuelve false
    if (!value) return false;
    // Instancia para la fecha generada con momment
    const fecha = moment(value);
    // Mediante el método isValid se comprueba la validez de la fecha
    return fecha.isValid() ? true : false;
    
};

// Exportación de módulo para la verificación de fecha
module.exports = {
    isDate 
};
