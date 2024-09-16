const clienteModel = require('../models/clienteModel');

// Função para listar clientes
async function listarClientes(req, res) {
    try {
        const clientes = await clienteModel.getClientes();
        res.json(clientes);  // Retorna os dados dos clientes em formato JSON
    } catch (error) {
        res.status(500).send('Erro ao listar clientes');
    }
}

// Função para adicionar um novo cliente
async function novoCliente(req, res) {
    const { nome, cpf, telefone } = req.body;

    console.log('Requisição recebida:', req.body); // Verifica os dados recebidos

    try {
        // Chama a função de inserção no model
        await clienteModel.novoCliente(nome, cpf, telefone);
        res.status(201).send('Cliente inserido com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir cliente:', error);
        res.status(500).send('Erro ao inserir cliente');
    }
}

// Função para atualizar um cliente existente
async function atualizarCliente(req, res) {
    const { id_cliente, nome, cpf, telefone } = req.body;

    try {
        // Chama a função de atualização no model
        await clienteModel.updateCliente(id_cliente, nome, cpf, telefone);
        res.status(200).send('Cliente atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).send('Erro ao atualizar cliente');
    }
}

// Função para excluir um cliente
async function excluirCliente(req, res) {
    const { id } = req.params;

    try {
        // Chama a função de exclusão no model
        await clienteModel.excluirCliente(id);
        res.status(200).send('Cliente excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        res.status(500).send('Erro ao excluir cliente');
    }
}

module.exports = { listarClientes, novoCliente, atualizarCliente, excluirCliente };
