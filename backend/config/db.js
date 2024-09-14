const oracledb = require("oracledb");
require("dotenv").config();

async function initialize() {
  try {
    await oracledb.createPool({
      user: 'system',
      password: '123456',
      connectString: 'localhost:1521',
    });
    console.log("Conexão com Oracle estabelecida");
  } catch (err) {
    console.error("Erro ao conectar ao Oracle", err);
  }
}

async function close() {
  await oracledb.getPool().close();
}

module.exports = { initialize, close };
