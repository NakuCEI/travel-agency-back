// Instancia del módulo importado de bcrypt para la encriptación
const bcrypt = require('bcryptjs');
// Importar método de generación de token
const { JWTGenerator } = require('../helpers/jwt');
// Importar modelo de datos del usuario
const User = require('../models/UserModel');

// Método para registro de nuevo usuario
const createUser = async (req, res) => {
    // Desestructuración de constantes del email y el password del body de la petición
    const { email, password } = req.body;

    // Bloque try/catch para la gestión con la bbdd
    try {
        // Variable para guardar el resultado de búsqueda de usuario por el email
        let usuario = await User.findOne({ email });

        // Si 'usuario' existe es que ya hay usuario con ese email
        if (usuario) {
            // Se devuelve un error 400 al no ser correctos los datos a procesar
            return res.status(400).json({
                ok: false, 
                msg: 'El usuario ya existe.'
            });
        };

        // Una vez confirmado que el usuario no existe se asigna en la variable 'usuario' los datos del body de la petición
        usuario = new User(req.body);

        // En salt se guarda la cadena de datos aleatoria que se utiliza para modificar el hash de la contraseña
        const salt = bcrypt.genSaltSync();
        // En el valor del password del usuario se guarda la versión cifrada de la contraseña
        usuario.password = bcrypt.hashSync(password, salt);

        // Se guarda el usuario en la bbdd 
        await usuario.save();

        // Se genera el token con el id y el nombre del usuario
        const token = await JWTGenerator(usuario.id, usuario.name);

        // En el objeto 'user' se guardan los datos del usuario
        const user = {
            name: usuario.name, 
            uid: usuario._id
        };
        
        // Se devuelve respuesta de status 201 indicando que la solicitud ha tenido éxito y se ha llevado a cabo a la creación del registro del usuario
        return res.status(201).json({
            ok: true, 
            msg: 'Usuario registrado correctamente.', 
            token, 
            user 
        });

    } catch (error) {
        // En caso de error de servidor se devuelve un status 500 para indicar que el servidor no puede completar la petición
        console.log(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Contacta con el administrador.'
        });
    }
};

// Método para el login de un usuario existente
const loginUser = async (req, res) => {
    // Desestructuración de constantes del email y el password del body de la petición
    const { email, password } = req.body;

    // Bloque try/catch para la gestión con la bbdd
    try {
        // En 'usuario' se guarda el valor que se encuentre en la bbdd por el email
        let usuario = await User.findOne({ email });

        // Se comprueba que el usuario no existe
        if (!usuario) {
            // Al no haber usuario con esos datos se devuelve un status 400 para indicar que los datos no son correctos
            return res.status(400).json({
                ok: false, 
                msg: 'El usuario no existe.'
            });
        };

        // Una vez confirmado que el usuario existe se compara la contraseña guardada en bbdd con la recogida en la petición
        const passwordOK = bcrypt.compareSync(password, usuario.password);
        
        // Se comprueba si la contraseña es correcta
        if (!passwordOK) {
            // En caso de que la contraseña no sea correcta se devuelve un status 400 para indicar que ésta no es válida
            return res.status(400).json({
                ok: false, 
                msg: 'La contraseña no es válida.'
            });
        };

        // Una vez comprobado que el usuario existe y que la contraseña es correcta se genera el token
        const token = await JWTGenerator(usuario.id, usuario.name);

        // En el objeto 'user' se guardan los datos del usuario
        const user = {
            name: usuario.name,  
            uid: usuario._id
        };
        
        // Se devuelve respuesta de status 200 indicando que la solicitud ha tenido éxito y se envía el usuario y el token generado
        return res.status(200).json({
            ok: true, 
            msg: 'Login correcto.', 
            user, 
            token 
        });
        
    } catch (error) {
        // En caso de error de servidor se devuelve un status 500 para indicar que el servidor no puede completar la petición
        console.log(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Contacta con el administrador.'
        });
    };
};

// Método para la renovación de token
const renewToken = async (req, res) => {
    // Desestructuración de constantes del id y el nombre del usuario en la petición
    const { uid, name } = req;

    // Se genera el token para el usuario
    const token = await JWTGenerator(uid, name);
        
    // Se devuelve respuesta de status 200 indicando que la solicitud ha tenido éxito y se envía el id y el nombre del usuario y el token generado
    return res.status(200).json({
        ok: true, 
        msg: 'Renew token.', 
        user: { uid, name }, 
        token 
    });
};

// Exportación de métodos del módulo
module.exports = {
    createUser, 
    loginUser, 
    renewToken 
};
