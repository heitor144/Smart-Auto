import React, { useContext,useState } from "react";
import "./NovoServico.css";
import Servico from "../../../../../imgs/tela_menu/servicos-icon.svg";
import { ClientesContext } from "../../Clientes/ClientesContext";

const NovoServico = ({ onClose, onAddServico }) => {
  const { clientes } = useContext(ClientesContext);
  const [novoServico, setNovoServico] = useState({
    status: "",
    cliente: "",
    veiculo: "",
    valorTotal: "",
    valorPago: "",
    dataChegada: "",
    previsaoTermino: "",
    descricao: "",
    funcionario: "",
    imagem: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoServico({ ...novoServico, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddServico(novoServico);
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <header>
          <img src={Servico} />
          <h2>Novo Serviço</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <label>Status</label>
          <input
            list="status-list"
            name="status"
            value={novoServico.status}
            onChange={handleChange}
          />
          <datalist id="status-list">
            <option value="Não iniciado" />
            <option value="Em andamento" />
            <option value="Pronto" />
          </datalist>

          <label>Cliente</label>
          <input
            list="clientes-list"
            name="cliente"
            value={novoServico.cliente}
            onChange={handleChange}
          />

          <datalist id="clientes-list">
            {clientes.map((cliente) => (
              <option value={cliente.nome} />
            ))}
          </datalist>

          <label>Veículo</label>
          <input
            type="text"
            name="veiculo"
            value={novoServico.veiculo}
            onChange={handleChange}
          />
          <label>Valor Total</label>
          <input
            type="number"
            name="valorTotal"
            value={novoServico.valorTotal}
            onChange={handleChange}
          />
          <label>Valor Pago</label>
          <input
            type="number"
            name="valorPago"
            value={novoServico.valorPago}
            onChange={handleChange}
          />
          <label>Data de Chegada</label>
          <input
            type="date"
            name="dataChegada"
            value={novoServico.dataChegada}
            onChange={handleChange}
          />
          <label>Previsão de Término</label>
          <input
            type="date"
            name="previsaoTermino"
            value={novoServico.previsaoTermino}
            onChange={handleChange}
          />
          <label>Descrição do serviço</label>
          <input
            type="text"
            name="descricao"
            value={novoServico.descricao}
            onChange={handleChange}
          />
          <label>Funcionário responsável</label>
          <input
            type="text"
            name="funcionario"
            value={novoServico.funcionario}
            onChange={handleChange}
          />
          <label>Imagem</label>
          <input
            type="text"
            name="imagem"
            value={novoServico.imagem}
            onChange={handleChange}
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

export default NovoServico;
