const oracledb = require('oracledb');

async function getCargos() {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(`SELECT * FROM Cargo`);
    await connection.close();
    return result.rows;
}

module.exports = { getCargos };
