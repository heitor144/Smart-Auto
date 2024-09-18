const oracledb = require("oracledb");


async function getServicos() {
  let connection;

  try {
    connection = await oracledb.getConnection();

    // Consulta SQL para buscar todos os serviços, incluindo cliente e funcionário
    const result = await connection.execute(`
            SELECT 
                s.id_servico, 
                c.nome as cliente, 
                f.nome as funcionario, 
                s.status, 
                s.veiculo,
                s.valor_total, 
                s.valor_pago, 
                s.descricao_servico, 
                s.data_chegada,
                s.previsao_termino
            FROM 
                servico s
            join 
                cliente c
            on c.id_cliente = s.id_cliente
            join 
                funcionario f
            on f.id_funcionario = s.id_funcionario
            ORDER BY 
                s.id_servico
        `);

    return result.rows; // Retorna os resultados da consulta
  } catch (err) {
    console.error("Erro ao buscar serviços:", err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close(); // Fecha a conexão de forma segura
      } catch (err) {
        console.error("Erro ao fechar a conexão:", err);
      }
    }
  }
}

async function novoServico(
  id_cliente,
  id_funcionario,
  valor_total,
  veiculo,
  valor_pago,
  descricao_servico,
  data_chegada,
  previsao_termino
) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
            INSERT INTO Servico (id_cliente, id_funcionario, valor_total, veiculo, valor_pago, descricao_servico, data_chegada, previsao_termino) 
            VALUES (:id_cliente, :id_funcionario, TO_NUMBER(:valor_total), :veiculo, TO_NUMBER(:valor_pago), :descricao_servico, TO_DATE(:data_chegada, 'YYYY-MM-DD'), TO_DATE(:previsao_termino, 'YYYY-MM-DD'))
        `;

    await connection.execute(
      sql,
      {
        id_cliente: id_cliente,
        id_funcionario: id_funcionario,
        valor_total: valor_total,
        valor_pago: valor_pago,
        descricao_servico: descricao_servico,
        data_chegada: data_chegada,
        previsao_termino: previsao_termino,
        veiculo: veiculo,
      },
      { autoCommit: true }
    );

    console.log("Serviço inserido com sucesso!");
  } catch (err) {
    console.error("Erro ao inserir serviço:", err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Erro ao fechar a conexão:", err);
      }
    }
  }
}

async function updateServico(
  id_servico,
  id_cliente,
  id_funcionario,
  status,
  veiculo,
  valor_total,
  valor_pago,
  descricao_servico,
  data_chegada,
  previsao_termino
) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
            UPDATE Servico
            SET 
                id_cliente = :id_cliente, 
                id_funcionario = :id_funcionario, 
                status = :status, 
                veiculo = :veiculo,
                valor_total = TO_NUMBER(:valor_total),
                valor_pago = TO_NUMBER(:valor_pago),
                descricao_servico = :descricao_servico,
                data_chegada = TO_DATE(:data_chegada, 'YYYY-MM-DD'),
                previsao_termino = TO_DATE(:previsao_termino, 'YYYY-MM-DD')
            WHERE id_servico = :id_servico
        `;

    // Executa a atualização e retorna o resultado, incluindo rowsAffected
    const result = await connection.execute(
      sql,
      {
        id_servico: id_servico,
        id_cliente: id_cliente,
        id_funcionario: id_funcionario,
        status: status,
        veiculo: veiculo,
        valor_total: valor_total,
        valor_pago: valor_pago,
        descricao_servico: descricao_servico,
        data_chegada: data_chegada,
        previsao_termino: previsao_termino,
      },
      { autoCommit: true }
    );

    return result; // Retorna o resultado que contém o rowsAffected
  } catch (err) {
    console.error("Erro ao atualizar serviço:", err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Erro ao fechar a conexão:", err);
      }
    }
  }
}

async function excluirServico(id_servico) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
            DELETE FROM Servico 
            WHERE id_servico = :id_servico
        `;

    // Executa a exclusão e retorna o resultado, incluindo rowsAffected
    const result = await connection.execute(
      sql,
      {
        id_servico: id_servico,
      },
      { autoCommit: true }
    );

    return result; // Retorna o resultado que contém o rowsAffected
  } catch (err) {
    console.error("Erro ao excluir serviço:", err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Erro ao fechar a conexão:", err);
      }
    }
  }
}

async function getServicoPorId(id_servico) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    // Consulta SQL para buscar um serviço específico pelo id_servico
    const sql = `
            SELECT 
                id_servico, 
                id_cliente, 
                id_funcionario, 
                status, 
                valor_total, 
                valor_pago, 
                descricao_servico, 
                data_chegada, 
                previsao_termino, 
                veiculo
            FROM 
                servico
            WHERE 
                id_servico = :id_servico
        `;

    // Executa a consulta
    const result = await connection.execute(
      sql,
      { id_servico: id_servico }
    );

    // Retorna o resultado, assumindo que a consulta retorna apenas uma linha
    return result.rows[0];
  } catch (err) {
    console.error("Erro ao buscar serviço por ID:", err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close(); // Fecha a conexão de forma segura
      } catch (err) {
        console.error("Erro ao fechar a conexão:", err);
      }
    }
  }
}

module.exports = { getServicos, novoServico, updateServico, excluirServico, getServicoPorId };
