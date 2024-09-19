const express = require('express');
const router = express.Router();
const fluxoCaixaController = require('../controllers/fluxoCaixaController');

// Rota para listar os fluxos de caixa
router.get('/fluxoCaixa', fluxoCaixaController.listarFluxosCaixa);
// Rota para adicionar um novo fluxo de caixa
router.post('/fluxoCaixa', fluxoCaixaController.novoFluxoCaixa);
// Rota para atualizar um fluxo de caixa
router.put('/fluxoCaixa/atualizar', fluxoCaixaController.atualizarFluxoCaixa);
// Rota para excluir um fluxo de caixa
router.delete('/fluxoCaixa/:id', fluxoCaixaController.excluirFluxoCaixa);

module.exports = router;
