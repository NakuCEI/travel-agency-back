// Importar modelo de datos del carrito de compra
const Cart = require('../models/CartModel');

// Método para recoger los datos del carrito de compra
const getCart = async (req, res) => {
    // Se identifica el carrito de compra del usuario por su uid y se guarda en una constante
    const cart = await Cart.find({ user: req.uid });
        
    // Se devuelve respuesta de status 200 indicando que la solicitud ha tenido éxito y se envían los datos del carrito de compra del usuario
    return res.status(200).json({
        ok: true, 
        msg: 'Devolver carrito de compra.', 
        cart 
    });
};

// Método para crear un nuevo item en el carrito de compra
const createCartItem = async (req, res) => {
    // En la constante 'cart' se guardan los datos de la petición con el modelo establecido
    const cart = new Cart(req.body);

    // Bloque try/catch para la gestión con la bbdd
    try {
        // Se asigna la prop 'user' a 'cart' con el id del usuario
        cart.user = req.uid;

        // En una constante se almacena el nuevo item guardado
        const savedCartItem = await cart.save();

        // Se devuelve respuesta de status 201 indicando que la solicitud ha tenido éxito y se ha creado el item en el carrito de compra
        return res.status(201).json({
            ok: true, 
            msg: 'Item creado en el carrito de compra.', 
            cart: savedCartItem
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

// Método para actualizar un item en el carrito de compra
const updateCartItem = async (req, res) => {
    // En 'cartItemId' se almacena el valor del id del item para actualizar
    const cartItemId = req.params.id;
    // En 'uid' se guarda el id del usuario
    const uid = req.uid;
    
    // Bloque try/catch para la gestión con la bbdd
    try {
        // En la constante 'cart' se establece el elemento a actualizar según su id en la bbdd
        const cart = await Cart.findById(cartItemId);

        // Se comprueba que el item existe
        if (!cart) {
            // Al no existir el item se devuelve un status 404 para indicar que la bbdd no puede encontrar el recurso solicitado
            return res.status(404).json({
                ok: false, 
                msg: 'No hay item con ese id en el carrito de compra.'
            });
        };

        // Se comprueba que el id del usuario del item del carrito de compra a actualizar es el mismo que el del id recibido
        if (cart.user.toString() !== uid) {
            // En caso de que el id del usuario no sea el mismo se devuelve un status 401 para indicar que no está autorizado
            return res.status(401).json({
                ok: false, 
                msg: 'No estás autorizado.'
            });
        };

        // Una vez comprobado que el id es válido se guarda en un objeto los datos
        const newCart = {
            ...req.body, 
            user: uid 
        };

        // En una constante se almacenan los datos del item actualizado en bbdd
        const updatedCartItem = await Cart.findByIdAndUpdate(cartItemId, newCart, { new: true });

        // Se devuelve respuesta de status 200 indicando que la solicitud ha tenido éxito y se envían los datos del ítem del carrito de compra actualizado
        return res.status(200).json({
            ok: true, 
            msg: 'Item actualizado en el carrito de compra.', 
            updatedCartItem 
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

// Método para eliminar un item en el carrito de compra
const deleteCartItem = async (req, res) => {
    // En 'cartItemId' se almacena el valor del id del item para eliminar
    const cartItemId = req.params.id;
    // En 'uid' se guarda el id del usuario
    const uid = req.uid;
    
    // Bloque try/catch para la gestión con la bbdd
    try {
        
        // En la constante 'cart' se establece el elemento a eliminar según su id en la bbdd
        const cart = await Cart.findById(cartItemId);

        // Se comprueba que el item existe
        if (!cart) {
            // Al no existir el item se devuelve un status 404 para indicar que la bbdd no puede encontrar el recurso solicitado
            return res.status(404).json({
                ok: false, 
                msg: 'No hay item con ese id en el carrito de compra.'
            });
        };

        // Se comprueba que el id del usuario del item del carrito de compra a actualizar es el mismo que el del id recibido
        if (cart.user.toString() !== uid) {
            // En caso de que el id del usuario no sea el mismo se devuelve un status 401 para indicar que no está autorizado
            return res.status(401).json({
                ok: false, 
                msg: 'No estás autorizado.'
            });
        };

        // Una vez comprobado que el id es válido se guarda en una constante los datos del item eliminado mediante su id en bbdd
        const deletedCartItem = await Cart.findByIdAndRemove(cartItemId, { new: true });

        // Se devuelve respuesta de status 200 indicando que la solicitud ha tenido éxito y se envían los datos del ítem del carrito de compra eliminado
        return res.status(200).json({
            ok: true, 
            msg: 'Item eliminado en el carrito de compra.', 
            deletedCartItem 
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

// Método para eliminar los productos del carrito de compra de un usuario
const deleteUserCartItems = async (req, res) => {
        
    // Bloque try/catch para la gestión con la bbdd
    try {

        // Se guarda en una constante el número de los items eliminados mediante el id del usuario en bbdd
        const deletedCartItems = await Cart.deleteMany({ user: req.uid });

        // Se comprueba que los items existen
        if (!deletedCartItems) {
            // Al no existir los items se devuelve un status 404 para indicar que la bbdd no puede encontrar los recursos solicitados
            return res.status(404).json({
                ok: false, 
                msg: 'No hay items con ese id de usuario en el carrito de compra.'
            });
        };

        // Si existen se devuelve respuesta de status 200 indicando que la solicitud ha tenido éxito y se envía el número de los ítems del carrito de compra eliminados
        return res.status(200).json({
            ok: true, 
            msg: 'Items eliminados en el carrito de compra.', 
            deletedCartItems 
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


// Exportación de métodos del módulo
module.exports = {
    getCart, 
    createCartItem, 
    updateCartItem, 
    deleteCartItem, 
    deleteUserCartItems 
};
