const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  stock: { type: Number, required: true },
  img: { type: String, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('Producto', productoSchema, 'productos');

