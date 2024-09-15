const funcionarioModel = require('../models/funcionarioModel');

async function listarFuncionarios(req, res) {
    try {
        const funcionarios = await funcionarioModel.getFuncionarios();
        res.json(funcionarios);  // Retorna os dados dos funcionários em formato JSON
    } catch (error) {
        res.status(500).send('Erro ao listar funcionários');
    }
}

// Função para adicionar um novo funcionário
async function novoFuncionario(req, res) {
    const { nome, cpf, data_nascimento, salario, id_cargo } = req.body;

    try {
        // Chama a função de inserção no model
        await funcionarioModel.novoFuncionario(nome, cpf, salario, data_nascimento, id_cargo);
        res.status(201).send('Funcionário inserido com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir funcionário:', error);
        res.status(500).send('Erro ao inserir funcionário');
    }
}

// Função para atualizar um funcionário existente
async function atualizarFuncionario(req, res) {
    const { id_funcionario, nome, cpf, data_nascimento, salario, id_cargo } = req.body;

    try {
        // Chama a função de atualização no model
        await funcionarioModel.updateFuncionario(id_funcionario, nome, cpf, salario, data_nascimento, id_cargo);
        res.status(200).send('Funcionário atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar funcionário:', error);
        res.status(500).send('Erro ao atualizar funcionário');
    }
}

// Função para excluir um funcionário
async function excluirFuncionario(req, res) {
    const { id } = req.params;

    try {
        // Chama a função de exclusão no model
        await funcionarioModel.excluirFuncionario(id);
        res.status(200).send('Funcionário excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
        res.status(500).send('Erro ao excluir funcionário');
    }
}

module.exports = { listarFuncionarios, novoFuncionario, atualizarFuncionario, excluirFuncionario };
