const express = require('express');
const router = express.Router();

const { login, register, perfil } = require('../controllers/auth.controllers');
const verifyToken = require('../middlewares/VerifyToken');

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, perfil);

module.exports = router;