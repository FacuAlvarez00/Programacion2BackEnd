const mongoose = require('mongoose');

const ordenSchema = new mongoose.Schema({
  productos: [
    {
      _id: String,           
      nombre: String,         
      precio: Number,          
      cantidad: Number,        
      img: String              
    }
  ],
  total: Number,
  fecha: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    default: 'pendiente'      
  },
  cliente: {
    nombreCompleto: String,
    correo: String,
    ciudad: String,
    direccion: String,
    codigoPostal: String
  }
});

module.exports = mongoose.model('ordenes', ordenSchema);


