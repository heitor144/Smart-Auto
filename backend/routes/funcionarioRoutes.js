const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

// Rota para listar os funcionários
router.get('/funcionarios', funcionarioController.listarFuncionarios);
// Rota para adicionar um novo funcionário
router.post('/funcionarios', funcionarioController.novoFuncionario);
// Rota para atualizar um funcionário
router.put('/funcionarios/atualizar', funcionarioController.atualizarFuncionario);
// Rota para excluir um funcionário
router.delete('/funcionarios/:id', funcionarioController.excluirFuncionario);


module.exports = router;
