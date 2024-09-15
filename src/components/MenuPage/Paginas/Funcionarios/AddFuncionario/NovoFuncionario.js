import React, { useState, useEffect } from "react";
import "./NovoFuncionario.css";
import axios from "axios";
import Funcionario from "../../../../../imgs/tela_menu/funcionarios-icon.svg";

const NovoFuncionario = ({ onClose, onAddFuncionario }) => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [data_nascimento, setData_Nascimento] = useState("");
  const [salario, setSalario] = useState("");
  const [cargos, setCargos] = useState([]); // Para armazenar a lista de cargos
  const [cargoSelecionado, setCargoSelecionado] = useState(""); // Armazena o ID do cargo selecionado

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const resetForm = () => {
    setNome("");
    setCpf("");
    setData_Nascimento("");
    setCargoSelecionado("");
    setSalario("");
  };

  const handleCpfChange = (e) => {
    let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito

    // Aplica a máscara de CPF: XXX.XXX.XXX-XX
    if (valor.length <= 11) {
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    setCpf(valor); // Atualiza o estado com o CPF formatado
  };

  useEffect(() => {
    const fetchCargos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/cargos/cargos"
        );
        setCargos(response.data); // Atualiza o estado com os cargos vindos da API
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCargos(); // Chama a função quando o componente monta
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove tudo que não for número do CPF antes de enviar
    const cpfSemMascara = cpf.replace(/\D/g, "");

    // Converte a vírgula para ponto antes de enviar ao backend
    const salarioFormatado = parseFloat(salario.replace(",", "."));

    const novoFuncionario = {
      nome,
      cpf: cpfSemMascara, // Envia o CPF sem máscara
      data_nascimento,
      id_cargo: cargoSelecionado,
      salario: salarioFormatado, // Usa o salário formatado
    };

    console.log(novoFuncionario);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/funcionarios/funcionarios",
        novoFuncionario
      );

      if (response.status === 201) {
        console.log("Funcionário adicionado com sucesso", response.data);
        onAddFuncionario(response.data);
        resetForm(); // Reseta o formulário após a inserção com sucesso
        onClose(); // Fecha o modal
        
      } else {
        console.error("Erro ao adicionar funcionário", response.status);
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição", error);
      resetForm(); // Opcional: Reseta o formulário também em caso de erro
    }
  };

  const handleCargoChange = (e) => {
    const idCargoSelecionado = e.target.value;
    setCargoSelecionado(idCargoSelecionado); // Armazena o ID do cargo selecionado
  };

  return (
    <div className="modal-background">
      <div className="modal-content-func">
        <header>
          <img src={Funcionario} alt="Funcionario" />
          <h2>Novo Funcionário</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <label>Nome completo:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome..."
            required
          />

          <label>CPF:</label>
          <input
            type="text"
            value={cpf}
            onChange={handleCpfChange} // Aplica a função de formatação
            placeholder="Digite o CPF..."
            maxLength={14} // Limita o tamanho para 14 caracteres (CPF com máscara)
            required
          />

          <label>Data de nascimento:</label>
          <input
            type="date"
            value={data_nascimento}
            onChange={(e) => setData_Nascimento(e.target.value)}
            required
          />

          <label>Cargo:</label>
          <select
            value={cargoSelecionado}
            onChange={handleCargoChange} // Função que lida com a seleção de cargo
            required
          >
            <option value="" disabled>
              Selecione uma opção...
            </option>
            {cargos.map((cargo) => (
              <option key={cargo[0]} value={cargo[0]}>
                {cargo[1]} {/* Exibe o nome do cargo */}
              </option>
            ))}
          </select>

          <label>Salário:</label>
          <input
            type="number"
            value={salario}
            onChange={(e) => {
              const valor = e.target.value;
              // Permite apenas números e uma vírgula
              if (/^\d*([.]\d{0,2})?$/.test(valor)) {
                setSalario(valor);
              }
            }}
            placeholder="Digite o salário..."
            required
          />

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

export default NovoFuncionario;
