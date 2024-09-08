import React from "react";
import Detalhes from "../../../../../imgs/tela_menu/detalhes-icon.svg";
import Editar from "../../../../../imgs/tela_menu/editar-icon.svg";
import Lixeira from "../../../../../imgs/tela_menu/lixeira-icon.svg";
import "./Servico.css";

const Servico = ({ servico }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Não iniciado":
        return "status-nao-iniciado";
      case "Em andamento":
        return "status-em-andamento";
      case "Pronto":
        return "status-pronto";
      default:
        return "";
    }
  };

  return (
    <div className={`card-servico ${getStatusClass(servico.status)}`}>
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
        <img src={Detalhes} alt="Detalhes" />
        <img src={Editar} alt="Editar" />
        <img src={Lixeira} alt="Lixeira" />
      </div>
    </div>
  );
};

export default Servico;
