// Importar clase Schema para crear el modelo de carrito de compra
// Importar model para asignar Schema a la colección de la bbdd
const { Schema, model } = require('mongoose');

// Instancia del modelo de carrito de compra
const CartSchema = new Schema({
    reservation: {
        type: String, 
        required: true 
    }, 
    amount: {
        type: Number, 
        required: true 
    }, 
    start: {
        type: Date, 
        required: true 
    }, 
    end: {
        type: Date, 
        required: true 
    }, 
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    } 
});

// Exportación de módulo para el carrito de compra
module.exports = model('Cart', CartSchema);
