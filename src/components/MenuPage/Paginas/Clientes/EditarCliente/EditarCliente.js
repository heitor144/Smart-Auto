import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditarCliente.css";
import Cliente from "../../../../../imgs/tela_menu/clientes-icon.svg";

const EditarCliente = ({ cliente, onClose, onUpdateCliente }) => {
  const formatarCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatarTelefone = (telefone) => {
    return telefone.replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  };

  const [idCliente, setIdCliente] = useState(cliente[0]);
  const [nome, setNome] = useState(cliente[1]);
  const [cpf, setCpf] = useState(formatarCPF(cliente[2]));
  const [telefone, setTelefone] = useState(formatarTelefone(cliente[3]));
  const [dataNascimento, setDataNascimento] = useState(cliente[4]);
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

  const handleTelefoneChange = (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length <= 11) {
      valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
      valor = valor.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
    }
    setTelefone(valor);
  };

  useEffect(() => {
    if (cliente) {
      if (cliente[4]) {
        const dataNasc = new Date(cliente[4]);
        const dataFormatada = dataNasc.toISOString().split("T")[0];
        setDataNascimento(dataFormatada);
      }
    }
    setLoading(false);
  }, [cliente]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cpfSemMascara = cpf.replace(/\D/g, "");
    const telefoneSemMascara = telefone.replace(/\D/g, "");

    const updateCliente = {
      id_cliente: idCliente,
      nome,
      cpf: cpfSemMascara,
      telefone: telefoneSemMascara,
      data_nascimento: dataNascimento,
    };

    console.log("Dados a serem enviados:", updateCliente); // Adicionado para debug

    try {
      const response = await axios.put("http://localhost:3001/api/clientes/clientes/atualizar", updateCliente);

      console.log("Resposta do servidor:", response.data); // Adicionado para debug

      if (response.status >= 200 && response.status < 300) {
        onUpdateCliente(response.data);
        onClose();
      } else {
        console.error("Erro ao atualizar cliente", response.status);
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição", error);
    }
  };

  const handleClose = () => {
    onClose();
    window.location.reload(); // Recarrega a página
  };

  return (
    <div className="modal-background">
      <div className="modal-content-func">
        <header>
          <img src={Cliente} alt="Cliente" />
          <h2>Editar Cliente</h2>
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

          <label>Telefone:</label>
          <input
            type="text"
            value={telefone}
            onChange={handleTelefoneChange}
            placeholder="Digite o telefone..."
            maxLength={15}
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

export default EditarCliente;
