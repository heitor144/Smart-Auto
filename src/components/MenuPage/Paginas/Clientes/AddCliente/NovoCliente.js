import React, { useState } from "react";
import "./NovoCliente.css";
import Cliente from "../../../../../imgs/tela_menu/clientes-icon.svg";

const NovoCliente = ({ onClose, onAddCliente }) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCliente({ nome, telefone, cpf });
    onClose(); // Fechar o modal após adicionar o cliente
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <header>
          <img src={Cliente} />
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
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Digite o telefone..."
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
