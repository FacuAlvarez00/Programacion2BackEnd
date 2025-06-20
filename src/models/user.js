const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
  nombre: String,
  correo: { type: String, unique: true },
  password: String,
  rol: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
    }
});

module.exports = mongoose.model('Usuario', userSchema);
