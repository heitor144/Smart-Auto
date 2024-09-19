const oracledb = require('oracledb');

// Função para verificar login
async function verificarLogin(login, senha) {
    let connection;

    try {
        connection = await oracledb.getConnection();

        const sql = `
            SELECT * FROM Usuario WHERE login = :login AND senha = :senha
        `;

        const result = await connection.execute(sql, { login, senha });

        return result.rows.length > 0; // Retorna true se o usuário existir
    } catch (err) {
        console.error('Erro ao verificar login:', err);
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

module.exports = { verificarLogin };
