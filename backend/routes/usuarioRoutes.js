const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para login
router.post('/login', usuarioController.login);

module.exports = router;
