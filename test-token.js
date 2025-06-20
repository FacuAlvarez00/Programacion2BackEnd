const { generarToken } = require('./src/utils/jwt');

const usuario = {
  id: "homero218",
  nombre: "Homero",
  correo: "homero@planta-nuclear.org",
  rol: "admin"
};

const token = generarToken(usuario);
console.log("Token generado:", token);
