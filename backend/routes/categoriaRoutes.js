const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Rota para listar os cargos
router.get('/categorias', categoriaController.listarCategorias);

module.exports = router;
