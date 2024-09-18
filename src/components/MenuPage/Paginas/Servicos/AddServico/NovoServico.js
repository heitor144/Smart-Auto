import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NovoServico.css";
import Servico from "../../../../../imgs/tela_menu/servicos-icon.svg";

const NovoServico = ({ onClose, onAddServico }) => {
  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [novoServico, setNovoServico] = useState({
    id_cliente: "",
    veiculo: "",
    valor_total: "",
    valor_pago: "",
    data_chegada: "",
    previsao_termino: "",
    descricao_servico: "",
    id_funcionario: "",
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

    fetchClientes();
    fetchFuncionarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "valor_total" || name === "valor_pago") {
      // Permite apenas números e uma vírgula para decimais
      if (/^\d*([,.]\d{0,2})?$/.test(value)) {
        setNovoServico({ ...novoServico, [name]: value });
      }
    } else {
      setNovoServico({ ...novoServico, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove tudo que não for número e substitui vírgula por ponto para valores decimais
    const formatNumber = (value) => value.replace(/,/g, ".");

    const novoServicoFormatado = {
      ...novoServico,
      valor_total: parseFloat(formatNumber(novoServico.valor_total)),
      valor_pago: parseFloat(formatNumber(novoServico.valor_pago)),
    };

    console.log("Dados do novo serviço antes do envio:", novoServicoFormatado);

    try {
      const response = await axios.post("http://localhost:3001/api/servicos/servicos", novoServicoFormatado);

      console.log("Dados do novo serviço depois do envio:", response.data);

      onAddServico(response.data); // Atualiza a lista local após sucesso
      onClose();
      window.location.reload(); // Recarrega a página
    } catch (error) {
      console.error("Erro ao adicionar o serviço:", error);
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <header>
          <img src={Servico} alt="Serviço" />
          <h2>Novo Serviço</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <label>Cliente:</label>
          <select
            name="id_cliente"
            value={novoServico.id_cliente}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Selecione um cliente...</option>
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
            value={novoServico.veiculo}
            onChange={handleChange}
            placeholder="Digite qual o veículo..."
          />

          <label>Valor Total:</label>
          <input
            type="text"
            name="valor_total"
            value={novoServico.valor_total}
            onChange={handleChange}
            placeholder="Digite o valor total..."
          />

          <label>Valor Pago:</label>
          <input
            type="text"
            name="valor_pago"
            value={novoServico.valor_pago}
            onChange={handleChange}
            placeholder="Digite o valor pago..."
          />

          <label>Data de Chegada:</label>
          <input
            type="date"
            name="data_chegada"
            value={novoServico.data_chegada}
            onChange={handleChange}
          />

          <label>Previsão de Término:</label>
          <input
            type="date"
            name="previsao_termino"
            value={novoServico.previsao_termino}
            onChange={handleChange}
          />

          <label>Descrição do serviço:</label>
          <input
            type="text"
            name="descricao_servico"
            value={novoServico.descricao_servico}
            onChange={handleChange}
            placeholder="Digite uma descrição do serviço..."
          />

          <label>Funcionário responsável:</label>
          <select
            name="id_funcionario"
            value={novoServico.id_funcionario}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Selecione um funcionário...</option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario[0]} value={funcionario[0]}>
                {funcionario[1]}
              </option>
            ))}
          </select>

          <div className="botao-adicionar">
            <button type="submit">Adicionar</button>
          </div>
        </form>
        <div className="botao-fechar">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default NovoServico;
