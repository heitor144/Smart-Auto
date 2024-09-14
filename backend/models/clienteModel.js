const oracledb = require('oracledb');

async function getClientes() {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(`SELECT * FROM Cliente`);
    await connection.close();
    return result.rows;
}

module.exports = { getClientes };
