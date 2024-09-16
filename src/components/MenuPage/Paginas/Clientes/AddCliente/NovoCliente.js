import React, { useState } from "react";
import "./NovoCliente.css";
import axios from "axios";
import Cliente from "../../../../../imgs/tela_menu/clientes-icon.svg";

const NovoCliente = ({ onClose, onAddCliente }) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  const resetForm = () => {
    setNome("");
    setTelefone("");
    setCpf("");
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

  const handleTelefoneChange = (e) => {
    let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito

    // Aplica a máscara de telefone: (XX) X-XXXX-XXXX
    if (valor.length <= 11) {
      valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
      valor = valor.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
    }

    setTelefone(valor); // Atualiza o estado com o telefone formatado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove a máscara de CPF e telefone antes de enviar
    const cpfSemMascara = cpf.replace(/\D/g, "");
    const telefoneSemMascara = telefone.replace(/\D/g, "");

    const novoCliente = {
      nome,
      telefone: telefoneSemMascara, // Envia o telefone sem máscara
      cpf: cpfSemMascara, // Envia o CPF sem máscara
    };

    console.log(novoCliente);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/clientes/clientes/adicionar",
        novoCliente
      );

      if (response.status === 201) {
        console.log("Cliente adicionado com sucesso", response.data);
        onAddCliente(response.data); // Chama o callback para adicionar o cliente
        resetForm(); // Reseta o formulário
        onClose(); // Fecha o modal
      } else {
        console.error("Erro ao adicionar cliente", response.status);
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição", error);
      resetForm(); // Opcional: Reseta o formulário em caso de erro
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <header>
          <img src={Cliente} alt="Cliente" />
          <h2>Novo Cliente</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <label>Nome Completo:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome..."
            required
          />

          <label>Telefone:</label>
          <input
            type="text"
            value={telefone}
            onChange={handleTelefoneChange} // Aplica a função de formatação
            placeholder="Digite o telefone..."
            maxLength={15} // Limita o tamanho para 15 caracteres (telefone com máscara)
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

export default NovoCliente;
