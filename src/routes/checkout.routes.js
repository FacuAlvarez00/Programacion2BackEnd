const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/VerifyToken');
const { crearPedido, obtenerPedido } = require('../controllers/checkout.controller');

router.post('/checkout', verifyToken, crearPedido);
router.get('/checkout/:id', verifyToken, obtenerPedido);

module.exports = router;
