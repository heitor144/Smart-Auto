const oracledb = require('oracledb');

// Função para listar os clientes
async function getClientes() {
    let connection;

    try {
        connection = await oracledb.getConnection();

        // Consulta SQL para buscar os clientes
        const result = await connection.execute(`SELECT * FROM Cliente ORDER BY id_cliente`);

        return result.rows; // Retorna os resultados da consulta

    } catch (err) {
        console.error('Erro ao buscar clientes:', err);
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

// Função para adicionar um novo cliente
async function novoCliente(nome, cpf, telefone) {
    let connection;

    console.log(nome);
    console.log(cpf);
    console.log(telefone);

    try {
        connection = await oracledb.getConnection();

        // Comando SQL de INSERT
        const sql = `
            INSERT INTO Cliente (nome, cpf, telefone) 
            VALUES (:nome, :cpf, :telefone)
        `;

        // Executa a inserção
        await connection.execute(sql, {
            nome: nome,
            cpf: cpf,
            telefone: telefone
        }, { autoCommit: true });

        console.log('Cliente inserido com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir cliente:', err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Erro ao fechar a conexão:', err);
            }
        }
    }
}

// Função para atualizar um cliente existente
async function updateCliente(id_cliente, nome, cpf, telefone) {
    let connection;

    try {
        connection = await oracledb.getConnection();

        // Comando SQL de UPDATE
        const sql = `
            UPDATE Cliente 
            SET 
                nome = :nome, 
                cpf = :cpf, 
                telefone = :telefone
            WHERE 
                id_cliente = :id_cliente
        `;

        // Executa a atualização
        const result = await connection.execute(sql, {
            id_cliente: id_cliente,
            nome: nome,
            cpf: cpf,
            telefone: telefone
        }, { autoCommit: true });

        if (result.rowsAffected === 0) {
            console.log('Nenhum cliente foi atualizado. Verifique o ID.');
        } else {
            console.log('Cliente atualizado com sucesso!');
        }
    } catch (err) {
        console.error('Erro ao atualizar cliente:', err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Erro ao fechar a conexão:', err);
            }
        }
    }
}

// Função para excluir um cliente
async function excluirCliente(id_cliente) {
    let connection;

    try {
        connection = await oracledb.getConnection();

        // Comando SQL de DELETE
        const sql = `
            DELETE FROM Cliente 
            WHERE id_cliente = :id_cliente
        `;

        // Executa a exclusão
        const result = await connection.execute(sql, {
            id_cliente: id_cliente
        }, { autoCommit: true });

        if (result.rowsAffected === 0) {
            console.log('Nenhum cliente foi excluído. Verifique o ID.');
        } else {
            console.log('Cliente excluído com sucesso!');
        }
    } catch (err) {
        console.error('Erro ao excluir cliente:', err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Erro ao fechar a conexão:', err);
            }
        }
    }
}

module.exports = { getClientes, novoCliente, updateCliente, excluirCliente };
