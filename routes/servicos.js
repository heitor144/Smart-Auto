const express = require('express');
const router = express.Router();
const servicoController = require('../../controllers/servicoControllerntroller');

// Exemplo de rota para obter todos os serviços
router.get('/servicos', servicoController.getAllServicos);

module.exports = router;
