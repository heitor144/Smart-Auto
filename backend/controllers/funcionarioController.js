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
    const { id_funcionario, nome, cpf, salario, data_nascimento, id_cargo } = req.body;

    try {
        // Chama a função de inserção no model
        await funcionarioModel.novoFuncionario(id_funcionario, nome, cpf, salario, data_nascimento, id_cargo);
        res.status(201).send('Funcionário inserido com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir funcionário:', error);
        res.status(500).send('Erro ao inserir funcionário');
    }
}

module.exports = { listarFuncionarios, novoFuncionario };
