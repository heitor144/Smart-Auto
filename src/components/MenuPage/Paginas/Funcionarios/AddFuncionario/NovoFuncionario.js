import React, { useState } from "react";
import "./NovoFuncionario.css";
import Funcionario from "../../../../../imgs/tela_menu/funcionarios-icon.svg";

const NovoFuncionario = ({ onClose, onAddFuncionario }) => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [cargo, setCargo] = useState("");
  const [salario, setSalario] = useState("");
  const [matricula, setMatricula] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoFuncionario = {
      nome,
      cpf,
      nascimento,
      cargo,
      salario,
      matricula,
    };
    onAddFuncionario(novoFuncionario); // Função para enviar o registro
    onClose(); // Fecha o modal após o envio
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <header>
          <img src={Funcionario} />
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

          {/* <label>PIS/COFINS:</label>
          <input type="number" value={pis} onChange={(e) => setPis(e.target.value)} placeholder='Digite o PIS...' required /> */}

          <label>Matrícula:</label>
          <input
            type="text"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            readonly
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
