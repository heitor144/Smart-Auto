const categoriaModel = require('../models/categoriaModel');

async function listarCategorias(req, res) {
    try {
        const categorias = await categoriaModel.getCategorias();
        res.json(categorias);  // Retorna os dados das categorias em formato JSON
    } catch (error) {
        res.status(500).send('Erro ao listar categorias');
    }
}

module.exports = { listarCategorias };
