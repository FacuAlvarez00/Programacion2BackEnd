const jwt = require('jsonwebtoken');
function generarToken(usuario) {


const payload = {
    sub: usuario.id, 
    nombre: usuario.nombre, 
    correo: usuario.correo, 
    rol: usuario.rol 
};


const secret = 'mi_clave_secreta';

const opciones = {
    expiresIn: '1h'  
    };

const token = jwt.sign(payload, secret, opciones);
    return token;
    }

module.exports = { generarToken };