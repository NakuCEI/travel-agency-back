// Importar módulo Router de express
const { Router } = require('express');
// Importar módulo check para la validación desde express-validator
const { check } = require('express-validator');
// Importar método de validación de fechas
const { isDate } = require('../helpers/isDate');
// Importar método para la validación de campos
const { validateInputs } = require('../middlewares/validateInputs');
// Importar método de validación de token en peticiones
const { validateJWT } = require('../middlewares/validateJWT');
// Importar métodos de peticiones a la bbdd desde controlador
const { 
    getCart, 
    createCartItem, 
    updateCartItem, 
    deleteCartItem, 
    deleteUserCartItems 
} = require('../controllers/cartController');

// Instancia para el Router
const router = Router();
// Claves de campos para validar
const keyStartDate = 'start';
const keyEndDate = 'end';
// Mensajes de error
const errorStartDate = 'Debes indicar la fecha de inicio.';
const errorEndDate = 'Debes indicar la fecha de finalización.';

// Confidurar router para usar la validación de token en las peticiones
router.use(validateJWT);

// Ruta para recoger el contenido del carrito de compra
router.get('/:id', getCart);

// Ruta para crear un ítem en el carrito de compra
router.post('/', [ 
    check(keyStartDate, errorStartDate).custom(isDate), 
    check(keyEndDate, errorEndDate).custom(isDate), 
    validateInputs 
], createCartItem);

// Ruta para actualizar un ítem en el carrito de compra
router.put('/:id', [ 
    check(keyStartDate, errorStartDate).custom(isDate), 
    check(keyEndDate, errorEndDate).custom(isDate), 
    validateInputs 
], updateCartItem);

// Ruta para eliminar un ítem en el carrito de compra
router.delete('/:id', deleteCartItem);

// Ruta para eliminar varios ítems en el carrito de compra de un usuario
router.delete('/delete/:id', deleteUserCartItems);

// Exportación de rutas
module.exports = router;
