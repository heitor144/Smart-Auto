const oracledb = require('oracledb');

// Função para obter todos os registros do fluxo de caixa com a descrição da categoria
async function getFluxosCaixa() {
    let connection;

    try {
        connection = await oracledb.getConnection();

        // Consulta SQL para buscar os registros do fluxo de caixa e suas respectivas categorias
        const result = await connection.execute(`
            SELECT 
                fc.id_fluxo, 
                fc.tipo, 
                fc.descricao, 
                c.descricao_categoria, 
                fc.valor_bruto, 
                fc.valor_liquido,
                fc.data
            FROM 
                Fluxo_Caixa fc
            JOIN 
                Categoria c 
            ON 
                fc.id_categoria = c.id_categoria
            ORDER BY fc.id_fluxo
        `);

        return result.rows;

    } catch (err) {
        console.error('Erro ao buscar fluxos de caixa:', err);
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

// Função para inserir um novo registro de fluxo de caixa
async function novoFluxoCaixa(tipo, descricao, id_categoria, valor_bruto, valor_liquido, data) {
    let connection;

    try {
        connection = await oracledb.getConnection();

        const sql = `
            INSERT INTO Fluxo_Caixa (tipo, descricao, id_categoria, valor_bruto, valor_liquido, data) 
            VALUES (:tipo, :descricao, :id_categoria, TO_NUMBER(:valor_bruto), TO_NUMBER(:valor_liquido), TO_DATE(:data, 'YYYY-MM-DD'))
        `;

        await connection.execute(sql, {
            tipo: tipo,
            descricao: descricao,
            id_categoria: id_categoria,
            valor_bruto: valor_bruto,
            valor_liquido: valor_liquido,
            data: data
        }, { autoCommit: true });

        console.log('Fluxo de caixa inserido com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir fluxo de caixa:', err);
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

// Função para atualizar um registro de fluxo de caixa
async function updateFluxoCaixa(id_fluxo, tipo, descricao, id_categoria, valor_bruto, valor_liquido, data) {
    let connection;

    try {
        connection = await oracledb.getConnection();

        const sql = `
            UPDATE Fluxo_Caixa 
            SET 
                tipo = :tipo, 
                descricao = :descricao, 
                id_categoria = :id_categoria, 
                valor_bruto = TO_NUMBER(:valor_bruto), 
                valor_liquido = TO_NUMBER(:valor_liquido),
                data = TO_DATE(:data, 'YYYY-MM-DD')
            WHERE 
                id_fluxo = :id_fluxo
        `;

        const result = await connection.execute(sql, {
            id_fluxo: id_fluxo,
            tipo: tipo,
            descricao: descricao,
            id_categoria: id_categoria,
            valor_bruto: valor_bruto,
            valor_liquido: valor_liquido,
            data: data
        }, { autoCommit: true });

        if (result.rowsAffected === 0) {
            console.log('Nenhum fluxo de caixa foi atualizado. Verifique o ID.');
        } else {
            console.log('Fluxo de caixa atualizado com sucesso!');
        }
    } catch (err) {
        console.error('Erro ao atualizar fluxo de caixa:', err);
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

// Função para excluir um registro de fluxo de caixa
async function excluirFluxoCaixa(id_fluxo) {
    let connection;

    try {
        connection = await oracledb.getConnection();

        const sql = `
            DELETE FROM Fluxo_Caixa 
            WHERE id_fluxo = :id_fluxo
        `;

        const result = await connection.execute(sql, {
            id_fluxo: id_fluxo
        }, { autoCommit: true });

        if (result.rowsAffected === 0) {
            console.log('Nenhum fluxo de caixa foi excluído. Verifique o ID.');
        } else {
            console.log('Fluxo de caixa excluído com sucesso!');
        }
    } catch (err) {
        console.error('Erro ao excluir fluxo de caixa:', err);
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

module.exports = { getFluxosCaixa, novoFluxoCaixa, updateFluxoCaixa, excluirFluxoCaixa };
