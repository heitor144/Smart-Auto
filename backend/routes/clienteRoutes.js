const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rota para listar os clientes
router.get('/clientes', clienteController.listarClientes);
// Rota para adicionar um novo cliente
router.post('/clientes/adicionar', clienteController.novoCliente);
// Rota para atualizar um cliente
router.put('/clientes/atualizar', clienteController.atualizarCliente);
// Rota para excluir um cliente
router.delete('/clientes/:id', clienteController.excluirCliente);

module.exports = router;
