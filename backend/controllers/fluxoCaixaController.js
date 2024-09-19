const fluxoCaixaModel = require('../models/fluxoCaixaModel');

// Função para listar todos os fluxos de caixa
async function listarFluxosCaixa(req, res) {
    try {
        const fluxos = await fluxoCaixaModel.getFluxosCaixa();
        res.json(fluxos);  // Retorna os dados dos fluxos de caixa em formato JSON
    } catch (error) {
        res.status(500).send('Erro ao listar fluxos de caixa');
    }
}

// Exemplo de função para adicionar um novo fluxo de caixa no fluxoCaixaController.js
async function novoFluxoCaixa(req, res) {
    const { tipo, descricao, id_categoria, valor_bruto, valor_liquido, data } = req.body;

    try {
        await fluxoCaixaModel.novoFluxoCaixa(tipo, descricao, id_categoria, valor_bruto, valor_liquido, data);
        res.status(201).send('Fluxo de caixa inserido com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir fluxo de caixa:', error);
        res.status(500).send('Erro ao inserir fluxo de caixa');
    }
}


// Função para atualizar um fluxo de caixa existente
async function atualizarFluxoCaixa(req, res) {
    const { id_fluxo, tipo, descricao, id_categoria, valor_bruto, valor_liquido } = req.body;

    try {
        // Chama a função de atualização no model
        await fluxoCaixaModel.updateFluxoCaixa(id_fluxo, tipo, descricao, id_categoria, valor_bruto, valor_liquido);
        res.status(200).send('Fluxo de caixa atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar fluxo de caixa:', error);
        res.status(500).send('Erro ao atualizar fluxo de caixa');
    }
}

// Função para excluir um fluxo de caixa
async function excluirFluxoCaixa(req, res) {
    const { id } = req.params;

    try {
        // Chama a função de exclusão no model
        await fluxoCaixaModel.excluirFluxoCaixa(id);
        res.status(200).send('Fluxo de caixa excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir fluxo de caixa:', error);
        res.status(500).send('Erro ao excluir fluxo de caixa');
    }
}

module.exports = { listarFluxosCaixa, novoFluxoCaixa, atualizarFluxoCaixa, excluirFluxoCaixa };
