const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta'; 


function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: 'No se envio ningun token' });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token invalido o expirado por tiempo' });
  }
}

module.exports = verifyToken;
