const express = require('express');
const router = express.Router();
const Orden = require('../models/orden');
const Producto = require('../models/Producto');
const verifyToken = require('../middlewares/VerifyToken'); 
const verifyAdmin = require('../middlewares/VerifyAdmin');

// Crear nueva orden
router.post('/', async (req, res) => {
  try {
    const { productos } = req.body;

    if (!productos || productos.length === 0) {
      return res.status(400).json({ error: 'No hay productos en la orden' });
    }

    let total = 0;

    for (const item of productos) {
      const producto = await Producto.findById(item.productoId);
      if (!producto) {
        return res.status(404).json({ error: `Producto no encontrado: ${item.productoId}` });
      }
      if (producto.stock < item.cantidad) {
        return res.status(400).json({ error: `Stock insuficiente para ${producto.nombre}` });
      }

      total += producto.precio * item.cantidad;
      producto.stock -= item.cantidad;
      await producto.save();
    }

    const nuevaOrden = new Orden({
      productos,
      total
    });

    await nuevaOrden.save();
    res.status(201).json({ mensaje: 'Orden guardada' });
  } catch (error) {
    console.error('Error al guardar orden:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener todas las ordenes
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const ordenes = await Orden.find().sort({ fecha: -1 });
    res.json(ordenes);
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar estado de orden
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const ordenId = req.params.id;
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({ error: 'El nuevo estado es requerido' });
    }

    const ordenActualizada = await Orden.findByIdAndUpdate(
      ordenId,
      { estado },
      { new: true }
    );

    if (!ordenActualizada) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    res.json({ mensaje: 'Estado actualizado', orden: ordenActualizada });
  } catch (error) {
    console.error('Error al actualizar estado de orden:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;


