const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');

// Rota para listar os serviços
router.get('/servicos', servicoController.listarServicos);
// Rota para adicionar um novo serviço
router.post('/servicos', servicoController.novoServico);
// Rota para atualizar um serviço
router.put('/servicos/atualizar', servicoController.atualizarServico);
// Rota para excluir um serviço
router.delete('/servicos/:id', servicoController.excluirServico);
// Rota para buscar um serviço por ID
router.get('/servicos/:id_servico', servicoController.buscarServicoPorId);

module.exports = router;
