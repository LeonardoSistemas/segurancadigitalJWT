// authController.js

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Exemplo de dados de usuários (em uma aplicação real, você buscaria do banco de dados)
const users = [
  { id: 1, username: 'admin', password: 'adminpass', role: 'admin' },
  { id: 2, username: 'user', password: 'userpass', role: 'user' }
];

// Rota de login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(400).send({ error: 'Invalid credentials.' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, 'ETEC');
  res.send({ token });
});

module.exports = router;
