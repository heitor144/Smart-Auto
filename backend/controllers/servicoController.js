const servicoModel = require('../models/servicoModel');

// Função para listar todos os serviços
async function listarServicos(req, res) {
    try {
        const servicos = await servicoModel.getServicos();
        res.json(servicos);  // Retorna os dados dos serviços em formato JSON
    } catch (error) {
        res.status(500).send('Erro ao listar serviços');
    }
}

// Função para adicionar um novo serviço
async function novoServico(req, res) {
    const { id_cliente, id_funcionario, valor_total, veiculo, valor_pago, descricao_servico, data_chegada, previsao_termino } = req.body;

    try {
        await servicoModel.novoServico(id_cliente, id_funcionario, valor_total, veiculo, valor_pago, descricao_servico, data_chegada, previsao_termino);
        res.status(201).send('Serviço inserido com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir serviço:', error);
        res.status(500).send('Erro ao inserir serviço');
    }
}

// Função para atualizar um serviço existente
async function atualizarServico(req, res) {
    const { id_servico, id_cliente, id_funcionario, status, veiculo, valor_total, valor_pago, descricao_servico, data_chegada, previsao_termino } = req.body;

    try {
        const result = await servicoModel.updateServico(id_servico, id_cliente, id_funcionario, status, veiculo, valor_total, valor_pago, descricao_servico, data_chegada, previsao_termino);
        
        if (result.rowsAffected === 0) {
            return res.status(404).send('Nenhum serviço foi atualizado. Verifique o ID.');
        }

        res.status(200).send('Serviço atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar serviço:', error);
        res.status(500).send('Erro ao atualizar serviço');
    }
}

// Função para excluir um serviço
async function excluirServico(req, res) {
    const { id } = req.params;

    try {
        const result = await servicoModel.excluirServico(id);
        
        if (result.rowsAffected === 0) {
            return res.status(404).send('Nenhum serviço foi excluído. Verifique o ID.');
        }

        res.status(200).send('Serviço excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir serviço:', error);
        res.status(500).send('Erro ao excluir serviço');
    }
}

// Função para buscar um serviço por ID
async function buscarServicoPorId(req, res) {
    const { id_servico } = req.params;

    try {
        const servico = await servicoModel.getServicoPorId(id_servico);
        
        if (!servico) {
            return res.status(404).send('Serviço não encontrado.');
        }

        res.json(servico);
    } catch (error) {
        console.error('Erro ao buscar serviço por ID:', error);
        res.status(500).send('Erro ao buscar serviço');
    }
}

module.exports = { listarServicos, novoServico, atualizarServico, excluirServico, buscarServicoPorId };
