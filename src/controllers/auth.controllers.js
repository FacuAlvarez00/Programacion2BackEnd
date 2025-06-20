  const bcrypt = require('bcryptjs');
  const { generarToken } = require('../utils/jwt');
  const Usuario = require('../models/user')

  // Registrarse

  const register = async (req, res) => {
      try {
        console.log("Registrando usuario: ", req.body);
    
        const { nombre, correo, password, rol } = req.body;
 
    
        const usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
          return res.status(400).json({ mensaje: 'Ya existe una cuenta registrada con este mismo correo' });
        }
    
        const nuevoUsuario = new Usuario({
          nombre,
          correo,
          password: bcrypt.hashSync(password, 10),
          rol: rol || 'user'
        });
        await nuevoUsuario.save();        
    
        res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
      } catch (err) {
        console.error("Error al registrar:", err);
        res.status(500).json({ mensaje: 'Error en el servidor', error: err.message });
      }
    };

  // Login

  const login = async (req, res) => {
    try {
      const { correo, password } = req.body;


      const usuario = await Usuario.findOne({ correo });
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      const passwordValido = bcrypt.compareSync(password, usuario.password);
      if (!passwordValido) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }

      const token = generarToken(usuario);

      res.status(200).json({
        mensaje: 'Login exitoso',
        token
      });

  } catch (error) {
      console.error("Error al loguearse:", error); 
      res.status(500).json({ mensaje: 'Error del servidor', error: error.message });
    }
  };

  // Chequear datos del usuario logueado

  const perfil = async (req, res) => {
    try {

      const usuario = await Usuario.findOne({ correo: req.usuario.correo });
      if (!usuario){
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      } 

      res.status(200).json({
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      });
    } catch (err) {
      res.status(500).json({ mensaje: 'No se pudo conseguir los datos del usuario', error: err.message });
    }
  };

  module.exports = { login, register, perfil };
