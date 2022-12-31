// Importar clase Schema para crear el modelo de usuario
// Importar model para asignar Schema a la colección de la bbdd
const { Schema, model } = require('mongoose');

// Instancia del modelo de usuario
const UserSchema = new Schema({
    name: {
        type: String, 
        required: true 
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true 
    }, 
    password: {
        type: String, 
        required: true 
    } 
});

// Exportación de módulo para el usuario
module.exports = model('User', UserSchema);
