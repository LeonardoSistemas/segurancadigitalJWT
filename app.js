// app.js

const express = require('express');
const bodyParser = require('body-parser');
const { isAuthenticated, hasRole } = require('./authMiddleware');
const authController = require('./authController');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authController);

// Rota aberta
app.get('/public', (req, res) => {
  res.send('This is a public route.');
});

// Rota protegida para usuários autenticados
app.get('/private', isAuthenticated, (req, res) => {
  res.send('This is a private route.');
});

// Rota protegida para administradores
app.get('/admin', isAuthenticated, hasRole('admin'), (req, res) => {
  res.send('This is an admin route.');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
