const express = require('express');
const router = express.Router();
const cargoController = require('../controllers/cargoController');

// Rota para listar os cargos
router.get('/cargos', cargoController.listarCargos);

module.exports = router;
