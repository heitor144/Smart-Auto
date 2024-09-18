import React, { useState } from "react";
import axios from "axios";
import Detalhes from "../../../../../imgs/tela_menu/detalhes-icon.svg";
import Editar from "../../../../../imgs/tela_menu/editar-icon.svg";
import Lixeira from "../../../../../imgs/tela_menu/lixeira-icon.svg";
import DetalhesServico from "../DetalhesServico/DetalhesServico";
import EditarServico from "../EditarServico/EditarServico";
import "./Servico.css";

const Servico = ({ servico, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Definindo a função getStatusClass
  const getStatusClass = (status) => {
    switch (status) {
      case "Não iniciado":
        return "nao-iniciado";
      case "Em andamento":
        return "em-andamento";
      case "Aguardando retirada":
        return "aguardando-retirada";
      case "Finalizado":
        return "finalizado";
      default:
        return "";
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este serviço?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:3001/api/servicos/servicos/${servico.id}`
        );
        onDelete(servico.id);
      } catch (error) {
        console.error("Erro ao excluir o serviço:", error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className={`card-servico status-${getStatusClass(servico.status)}`}>
      <div className="info-esquerda">
        <h4>
          <strong>ID:</strong> {servico.id}
        </h4>
        <p>
          <strong>Cliente:</strong> {servico.cliente}
        </p>
        <p>
          <strong>Veículo:</strong> {servico.veiculo}
        </p>
        <p>
          <strong>Valor total:</strong> R${servico.valorTotal}
        </p>
        <p>
          <strong>Valor pago:</strong> R${servico.valorPago}
        </p>
        <p>
          <strong>Data de chegada:</strong> {servico.dataChegada}
        </p>
        <p>
          <strong>Prev. de término:</strong> {servico.previsaoTermino}
        </p>
        <p>
          <strong>Descrição do serviço:</strong>
        </p>
        <p>{servico.descricao}</p>
        <p>
          <strong>Funcionário:</strong> {servico.funcionario}
        </p>
      </div>

      <div className="status-direita">
        <p>
          <strong>Status:</strong> {servico.status}
        </p>
      </div>

      <div className="info-direita">
        <img src={servico.imagem}></img>
      </div>

      <div className="botoes-acao">
        <img
          src={Detalhes}
          alt="Detalhes"
          onClick={() => setIsModalOpen(true)}
        />
        <img src={Editar} alt="Editar" onClick={handleEdit} />
        <img src={Lixeira} alt="Lixeira" onClick={handleDelete} />
      </div>

      {isEditModalOpen && (
        <EditarServico
          servico={servico}
          
          onClose={handleCloseEditModal}
          onUpdateServico={(updatedServico) => {
            // Atualiza o serviço na lista
          }}
        />
      )}

      {isModalOpen && (
        <DetalhesServico
          servico={servico}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Servico;
