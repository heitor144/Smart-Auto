import React from "react";
import "./DetalhesServico.css"; // Crie um CSS para estilizar o modal

const DetalhesServico = ({ servico, onClose }) => {
  if (!servico) return null; // Se não houver serviço selecionado, não renderiza o modal

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Detalhes do Serviço</h2>
        <p>
          <strong>ID:</strong> {servico.id}
        </p>
        <p>
          <strong>Cliente:</strong> {servico.cliente}
        </p>
        <p>
          <strong>Veículo:</strong> {servico.veiculo}
        </p>
        <p>
          <strong>Valor Total:</strong> R${servico.valorTotal}
        </p>
        <p>
          <strong>Valor Pago:</strong> R${servico.valorPago}
        </p>
        <p>
          <strong>Data de Chegada:</strong> {servico.dataChegada}
        </p>
        <p>
          <strong>Previsão de Término:</strong> {servico.previsaoTermino}
        </p>
        <p>
          <strong>Descrição do Serviço:</strong> {servico.descricao}
        </p>
        <p>
          <strong>Funcionário:</strong> {servico.funcionario}
        </p>
        <p>
          <strong>Status:</strong> {servico.status}
        </p>
        <div className="botao-fechar">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default DetalhesServico;
