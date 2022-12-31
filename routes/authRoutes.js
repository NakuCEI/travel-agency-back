// Importar módulo Router de express
const { Router } = require('express');
// Importar módulo check para la validación desde express-validator
const { check } = require('express-validator');
// Importar método para la validación de campos
const { validateInputs } = require('../middlewares/validateInputs');
// Importar método de validación de token en peticiones
const { validateJWT } = require('../middlewares/validateJWT');
// Importar métodos de peticiones a la bbdd desde controlador
const { 
    createUser, 
    loginUser, 
    renewToken 
} = require('../controllers/authController');

// Instancia para el Router
const router = Router();
// Claves de campos para validar
const keyName = 'name';
const keyEmail = 'email';
const keyPassword = 'password';
// Mensajes de error
const errorName = 'Debes escribir el nombre.';
const errorEmail = 'Debes escribir un email correcto.';
const errorPassword = 'La contraseña debe tener entre seis y diez caracteres.';
// Objeto con valores de longitud de la contraseña
const lengthPassword = { min: 6, max: 10 };

// Ruta para registro de usuario nuevo
router.post('/new', [
    check(keyName, errorName).not().isEmpty(), 
    check(keyEmail, errorEmail).isEmail(), 
    check(keyPassword, errorPassword).isLength(lengthPassword), 
    validateInputs 
], createUser);

// Ruta para login de usuario registrado
router.post('/', [
    check(keyEmail, errorEmail).isEmail(), 
    check(keyPassword, errorPassword).isLength(lengthPassword), 
    validateInputs 
], loginUser);

// Ruta para la renovación de token
router.get('/renew', validateJWT, renewToken);

// Exportación de rutas
module.exports = router;