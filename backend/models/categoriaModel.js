const oracledb = require('oracledb');

async function getCategorias() {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(`SELECT * FROM Categoria`);
    await connection.close();
    return result.rows;
}

module.exports = { getCategorias };
