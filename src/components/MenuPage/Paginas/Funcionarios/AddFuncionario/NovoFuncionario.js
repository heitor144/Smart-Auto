import React, { useState } from "react";
import "./NovoFuncionario.css";
import axios from "axios"; // Importar axios para fazer a requisição
import Funcionario from "../../../../../imgs/tela_menu/funcionarios-icon.svg";

const NovoFuncionario = ({ onClose, onAddFuncionario }) => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [cargo, setCargo] = useState("");
  const [salario, setSalario] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoFuncionario = {
      nome,
      cpf,
      nascimento,
      cargo,
      salario,
    };

    try {
      // Faz a requisição POST para a API
      const response = await axios.post("http://localhost:3001/api/funcionarios", novoFuncionario);
      
      if (response.status === 201) {
        console.log("Funcionário adicionado com sucesso", response.data);
        onAddFuncionario(response.data); // Atualiza a lista de funcionários com o novo registro
        onClose(); // Fecha o modal após a inserção
      } else {
        console.error("Erro ao adicionar funcionário", response.status);
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição", error);
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
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
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite o CPF..."
            required
          />

          <label>Data de nascimento:</label>
          <input
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
            required
          />

          <label>Cargo:</label>
          <input
            list="cargos"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            placeholder="Selecione uma opção..."
            required
          />

          <datalist id="cargos">
            <option value="Pintor" />
            <option value="Funileiro" />
            <option value="Supervisor" />
          </datalist>

          <label>Salário:</label>
          <input
            type="number"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
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
