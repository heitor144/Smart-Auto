import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditarFuncionario.css";
import Funcionario from "../../../../../imgs/tela_menu/funcionarios-icon.svg";

const EditarFuncionario = ({ funcionario, onClose, onUpdateFuncionario }) => {
  const formatarCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const [idFuncionario, setIdFuncionario] = useState(funcionario[0]);
  const [nome, setNome] = useState(funcionario[1]);
  const [cpf, setCpf] = useState(formatarCPF(funcionario[2]));
  const [dataNascimento, setDataNascimento] = useState(funcionario[3]);
  const [salario, setSalario] = useState(funcionario[5].toFixed(2));
  const [cargos, setCargos] = useState([]);
  const [cargoSelecionado, setCargoSelecionado] = useState(""); // Inicialmente vazio

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCpfChange = (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length <= 11) {
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    setCpf(valor);
  };

  useEffect(() => {
    const fetchCargos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/cargos/cargos");
        setCargos(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCargos();
  }, []);

  useEffect(() => {
    if (cargos.length > 0 && funcionario) {
      // Encontra o cargo baseado no nome
      const cargo = cargos.find(c => c[1] === funcionario[4]);
      if (cargo) {
        setCargoSelecionado(cargo[0].toString()); // Atualiza o ID do cargo
      }
    }

    if (funcionario && funcionario[3]) {
      const dataNasc = new Date(funcionario[3]);
      const dataFormatada = dataNasc.toISOString().split("T")[0];
      setDataNascimento(dataFormatada);
    }
  }, [cargos, funcionario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cpfSemMascara = cpf.replace(/\D/g, "");
    const salarioFormatado = parseFloat(salario.replace(",", "."));

    const updateFuncionario = {
      id_funcionario: idFuncionario,
      nome,
      cpf: cpfSemMascara,
      data_nascimento: dataNascimento,
      id_cargo: cargoSelecionado, // O ID do cargo selecionado
      salario: salarioFormatado,
    };

    console.log("Dados a serem enviados:", updateFuncionario); // Adicionado para debug

    try {
      const response = await axios.put("http://localhost:3001/api/funcionarios/funcionarios/atualizar", updateFuncionario);

      console.log("Resposta do servidor:", response.data); // Adicionado para debug

      if (response.status >= 200 && response.status < 300) {
        onUpdateFuncionario(response.data);
        onClose();
      } else {
        console.error("Erro ao atualizar funcionário", response.status);
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição", error);
    }
  };

  const handleCargoChange = (e) => {
    setCargoSelecionado(e.target.value); // Armazena o ID do cargo selecionado
  };

  const handleClose = () => {
    onClose();
    window.location.reload(); // Recarrega a página
  };

  return (
    <div className="modal-background">
      <div className="modal-content-func">
        <header>
          <img src={Funcionario} alt="Funcionario" />
          <h2>Editar Funcionário</h2>
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
            onChange={handleCpfChange}
            placeholder="Digite o CPF..."
            maxLength={14}
            required
          />

          <label>Data de nascimento:</label>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />

          <label>Cargo:</label>
          <select
            value={cargoSelecionado}
            onChange={handleCargoChange}
            required
          >
            <option value="" disabled>
              Selecione uma opção...
            </option>
            {cargos.map((cargo) => (
              <option key={cargo[0]} value={cargo[0].toString()}>
                {cargo[1]} {/* Nome do cargo */}
              </option>
            ))}
          </select>

          <label>Salário:</label>
          <input
            type="number"
            value={salario}
            onChange={(e) => {
              const valor = e.target.value;
              if (/^\d*([.]\d{0,2})?$/.test(valor)) {
                setSalario(valor);
              }
            }}
            placeholder="Digite o salário..."
            required
          />

          <div className="botao-adicionar">
            <button type="submit">Salvar</button>
          </div>
        </form>

        <div className="botao-fechar">
        <button onClick={handleClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default EditarFuncionario;
