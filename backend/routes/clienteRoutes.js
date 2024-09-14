const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rota para listar os clientes
router.get('/clientes', clienteController.listarClientes);

module.exports = router;
