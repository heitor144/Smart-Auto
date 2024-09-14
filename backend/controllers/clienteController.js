const clienteModel = require('../models/clienteModel');

async function listarClientes(req, res) {
    try {
        const clientes = await clienteModel.getClientes();
        res.json(clientes);  // Retorna os dados dos clientes em formato JSON
    } catch (error) {
        res.status(500).send('Erro ao listar clientes');
    }
}

module.exports = { listarClientes };
