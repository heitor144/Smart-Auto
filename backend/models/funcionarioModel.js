const oracledb = require('oracledb');

async function getFuncionarios() {
    let connection;

    try {
        connection = await oracledb.getConnection();

        // Consulta SQL com JOIN para buscar os funcionários e a descrição dos cargos
        const result = await connection.execute(`
            SELECT 
                f.id_funcionario, 
                f.nome, 
                f.cpf, 
                f.data_nascimento, 
                c.descricao_cargo,
                f.salario
            FROM 
                funcionario f
            JOIN 
                cargo c 
            ON 
                c.id_cargo = f.id_cargo
            ORDER BY f.id_funcionario
        `);

        return result.rows; // Retorna os resultados da consulta

    } catch (err) {
        console.error('Erro ao buscar funcionários:', err);
        throw err; // Repassa o erro para ser tratado por quem chamou a função
    } finally {
        if (connection) {
            try {
                await connection.close(); // Fecha a conexão de forma segura
            } catch (err) {
                console.error('Erro ao fechar a conexão:', err);
            }
        }
    }
}

async function novoFuncionario(id_funcionario, nome, cpf, salario, data_nascimento, id_cargo) {
    let connection;

    try {
        connection = await oracledb.getConnection();

        // Comando SQL de INSERT com parâmetros bind para evitar SQL Injection
        const sql = `
            INSERT INTO Funcionario (id_funcionario, nome, cpf, salario, data_nascimento, id_cargo) 
            VALUES (:id_funcionario, :nome, :cpf, :salario, TO_DATE(:data_nascimento, 'YYYY-MM-DD'), :id_cargo)
        `;

        // Executa a inserção com os valores fornecidos
        await connection.execute(sql, {
            id_funcionario: id_funcionario,
            nome: nome,
            cpf: cpf,
            salario: salario,
            data_nascimento: data_nascimento, // Certifique-se de que o valor está no formato 'YYYY-MM-DD'
            id_cargo: id_cargo
        }, { autoCommit: true }); // autoCommit para garantir que a inserção seja confirmada no banco de dados

        console.log('Funcionário inserido com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir funcionário:', err);
        throw err; // Repassa o erro para ser tratado externamente
    } finally {
        if (connection) {
            try {
                await connection.close(); // Fecha a conexão de forma segura
            } catch (err) {
                console.error('Erro ao fechar a conexão:', err);
            }
        }
    }
}

module.exports = { getFuncionarios, novoFuncionario };
