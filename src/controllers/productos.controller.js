const Producto = require('../models/Producto')

async function obtenerProductos(req, res) {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}

module.exports = { obtenerProductos };
