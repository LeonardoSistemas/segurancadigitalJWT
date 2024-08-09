// authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware para verificar se o usuário está autenticado
function isAuthenticated(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log(token)
  console.log('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzIzMjM2NTY3fQ.BlJM043nEb_KVWMIULL02_lddA8pmMzQFJZfiepcI5c');
  try {
    const decoded = jwt.verify(token, 'ETEC');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate.' +err });
  }
}

// Middleware para verificar se o usuário tem a função necessária
function hasRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).send({ error: 'Access denied.' });
    }
    next();
  };
}

module.exports = { isAuthenticated, hasRole };
