const cargoModel = require('../models/cargoModel');

async function listarCargos(req, res) {
    try {
        const cargos = await cargoModel.getCargos();
        res.json(cargos);  // Retorna os dados dos cargos em formato JSON
    } catch (error) {
        res.status(500).send('Erro ao listar cargos');
    }
}

module.exports = { listarCargos };
