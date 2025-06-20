
const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/VerifyToken');
const verifyAdmin = require('../middlewares/VerifyAdmin');
const Producto = require('../models/Producto');

// Manda producto
router.post('/productos', verifyToken, verifyAdmin, async (req, res) => {
  const { img, nombre, descripcion, precio, stock } = req.body;

  if (!nombre || typeof precio !== 'number' || typeof stock !== 'number') {
    return res.status(400).json({ mensaje: "Campos inválidos" });
  }

  try {
    const nuevoProducto = new Producto({ img, nombre, descripcion, precio, stock });
    await nuevoProducto.save();

    res.status(201).json({ mensaje: "Producto creado correctamente", producto: nuevoProducto });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al crear producto", error: err.message });
  }
});

// Borrar un producto
router.delete('/productos/:id', verifyToken, verifyAdmin, async (req, res) => {
    const id = req.params.id; 

    try {
      const productoEliminado = await Producto.findByIdAndDelete(id);
  
      if (!productoEliminado) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }
  
      res.json({ mensaje: "Producto eliminado correctamente" });
    }

  catch (err) {
    console.error("❌ Error al eliminar producto:", err);
    res.status(500).json({ mensaje: "Error al eliminar producto" });
  }
});

// Actualizar productos
router.put('/productos/:id', verifyToken, verifyAdmin, async (req, res) => {
  const { nombre, descripcion, precio, stock, img } = req.body;

  // Validaciones basicas
  if (precio !== undefined && typeof precio !== 'number') {
    return res.status(400).json({ mensaje: "el precio solo puede ser un numero" });
  }

  if (stock !== undefined && typeof stock !== 'number') {
    return res.status(400).json({ mensaje: "el stock solo puede ser un numero" });
  }

  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      { nombre, descripcion, precio, stock, img },
      { new: true, runValidators: true } // Valido con mongoose para que no manden un dato que no va
    );

    if (!productoActualizado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json({
      mensaje: "Producto actualizado correctamente",
      producto: productoActualizado
    });
  } catch (err) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});


module.exports = router;
