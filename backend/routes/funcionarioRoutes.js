const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

// Rota para listar os funcionários
router.get('/funcionarios', funcionarioController.listarFuncionarios);
// Rota para adicionar um novo funcionário
router.post('/funcionarios', funcionarioController.novoFuncionario);

module.exports = router;
