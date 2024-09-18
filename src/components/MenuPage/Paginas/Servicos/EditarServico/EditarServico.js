import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditarServico.css";
import Servico from "../../../../../imgs/tela_menu/servicos-icon.svg";

const EditarServico = ({ servico, onClose, onUpdateServico }) => {
  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [updatedServico, setUpdatedServico] = useState({
    id_cliente: "",
    veiculo: "",
    valor_total: "",
    valor_pago: "",
    data_chegada: "",
    previsao_termino: "",
    descricao_servico: "",
    id_funcionario: "",
    status: "Não iniciado", 
  });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/clientes/clientes");
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/funcionarios/funcionarios");
        setFuncionarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };

const fetchServico = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/servicos/servicos/${servico.id}`);
    const data = response.data;

    console.log(response.data)

    if (!data) {
      console.error("Dados do serviço não encontrados.");
      return;
    }

    // Atualiza o estado com os dados do serviço
    setUpdatedServico({
      id_servico: response.data[0] || "",
      id_cliente: response.data[1] || "",
      id_funcionario: response.data[2] || "",
      status: response.data[3] || "Não iniciado",
      valor_total: response.data[4] || "",
      valor_pago: response.data[5] || "",
      descricao_servico: response.data[6] || "",
      data_chegada: formatDateToInput(response.data[7]) || "",
      previsao_termino: formatDateToInput(response.data[8]) || "",
      veiculo: response.data[9] || "",
    });
  } catch (error) {
    console.error("Erro ao buscar serviço:", error);
  }
};


    fetchClientes();
    fetchFuncionarios();
    fetchServico();
  }, [servico.id]);

  const formatDateToInput = (dateString) => {
    if (!dateString || typeof dateString !== 'string') {
      return '';
    }
    
    // Converte a string ISO 8601 para um objeto Date
    const date = new Date(dateString);
    
    // Verifica se a data é válida
    if (isNaN(date.getTime())) {
      return '';
    }
  
    // Formata a data no formato yyyy-MM-dd
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedServico({ ...updatedServico, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3001/api/servicos/servicos/atualizar`,
        updatedServico
      );
      onUpdateServico(response.data);
      onClose();
      window.location.reload(); // Recarrega a página
    } catch (error) {
      console.error("Erro ao atualizar o serviço:", error);
    }
  };

  const getClienteNome = (id) => {
    const cliente = clientes.find(c => c[0] === id);
    return cliente ? cliente[1] : "Desconhecido";
  };

  const getFuncionarioNome = (id) => {
    const funcionario = funcionarios.find(f => f[0] === id);
    return funcionario ? funcionario[1] : "Desconhecido";
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <header>
          <img src={Servico} alt="Serviço" />
          <h2>Editar Serviço</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <label>Cliente:</label>
          <select
            name="id_cliente"
            value={updatedServico.id_cliente}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecione um cliente...
            </option>
            {clientes.map((cliente) => (
              <option key={cliente[0]} value={cliente[0]}>
                {cliente[1]}
              </option>
            ))}
          </select>

          <label>Veículo:</label>
          <input
            type="text"
            name="veiculo"
            value={updatedServico.veiculo}
            onChange={handleChange}
            required
          />

          <label>Valor Total:</label>
          <input
            type="text"
            name="valor_total"
            value={updatedServico.valor_total}
            onChange={handleChange}
            required
          />

          <label>Valor Pago:</label>
          <input
            type="text"
            name="valor_pago"
            value={updatedServico.valor_pago}
            onChange={handleChange}
            required
          />

          <label>Data de Chegada:</label>
          <input
            type="date"
            name="data_chegada"
            value={updatedServico.data_chegada}
            onChange={handleChange}
            required
          />

          <label>Previsão de Término:</label>
          <input
            type="date"
            name="previsao_termino"
            value={updatedServico.previsao_termino}
            onChange={handleChange}
            required
          />

          <label>Descrição do serviço:</label>
          <input
            type="text"
            name="descricao_servico"
            value={updatedServico.descricao_servico}
            onChange={handleChange}
          />

          <label>Funcionário responsável:</label>
          <select
            name="id_funcionario"
            value={updatedServico.id_funcionario}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecione um funcionário...
            </option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario[0]} value={funcionario[0]}>
                {funcionario[1]}
              </option>
            ))}
          </select>

          <label>Status:</label>
          <select
            name="status"
            value={updatedServico.status}
            onChange={handleChange}
            required
          >
            <option value="Não iniciado">Não iniciado</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Aguardando retirada">Aguardando retirada</option>
            <option value="Finalizado">Finalizado</option>
          </select>

          <div className="botao-adicionar">
            <button type="submit">Salvar</button>
          </div>
        </form>

        <div className="botao-fechar">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default EditarServico;
