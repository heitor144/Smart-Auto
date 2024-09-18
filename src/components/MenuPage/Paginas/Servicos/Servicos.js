import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Servicos.css";
import Servicos_icon from "../../../../imgs/tela_menu/servicos-icon.svg";
import Plus from "../../../../imgs/tela_menu/add-icon.svg";
import Lupa from "../../../../imgs/tela_menu/pesquisa-icon.svg";
import Servico from "../Servicos/Servico/Servico"; // Importa o componente Servico
import NovoServico from "./AddServico/NovoServico"; // Importe o componente do modal

const Servicos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servicos, setServicos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState({
    "Não iniciado": true,
    "Em andamento": true,
    "Aguardando retirada": true,
    "Finalizado": false,
  });


  
  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/servicos/servicos"
        );

        const servicosFormatados = response.data.map((servico) => ({
          id: servico[0],
          cliente: servico[1],
          funcionario: servico[2],
          status: servico[3],
          veiculo: servico[4], // Novo campo veiculo
          valorTotal: servico[5],
          valorPago: servico[6],
          descricao: servico[7],
          dataChegada: new Date(servico[8]).toLocaleDateString(),
          previsaoTermino: new Date(servico[9]).toLocaleDateString(),
          imagem:
            "https://mecanicagarrett.com.br/wp-content/uploads/2020/11/diferen%C3%A7a-entre-lanternagem-e-funilaria.jpg",
        }));

        setServicos(servicosFormatados);
      } catch (error) {
        console.error("Erro ao buscar os serviços:", error);
      }
    };

    fetchServicos();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddServico = (servicoAdicionado) => {
    setServicos([
      ...servicos,
      {
        ...servicoAdicionado,
        id: servicoAdicionado.id, // Use o ID retornado pelo servidor
      },
    ]);
    handleCloseModal();
  };

  const handleDeleteServico = (id) => {
    setServicos(servicos.filter(servico => servico.id !== id));
  };

  const handleStatusChange = (status) => {
    setSelectedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [status]: !prevStatuses[status],
    }));
  };

  const filteredServicos = servicos
    .filter(
      (servico) =>
        (servico.cliente && servico.cliente.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (servico.funcionario && servico.funcionario.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (servico.veiculo && servico.veiculo.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter((servico) => selectedStatuses[servico.status]);

  return (
    <div className="con-prin-serv">
      <div className="sidebar">
        <div className="titulo-pag">
          <img src={Servicos_icon} alt="servicos-icon" />
          <p>Serviços</p>
        </div>
        <div className="add-botao">
          <button onClick={handleOpenModal}>
            <img src={Plus} alt="plus-icon" />
            Adicionar novo
          </button>
        </div>
        <div className="input-container-serv">
          <input
            type="text"
            placeholder="Digite o que busca..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <img src={Lupa} alt="Pesquisar" className="input-icon" />
        </div>

        <div className="status-filters">
          <label>
            <input
              type="checkbox"
              checked={selectedStatuses["Não iniciado"]}
              onChange={() => handleStatusChange("Não iniciado")}
            />
            Não iniciado
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedStatuses["Em andamento"]}
              onChange={() => handleStatusChange("Em andamento")}
            />
            Em andamento
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedStatuses["Aguardando retirada"]}
              onChange={() => handleStatusChange("Aguardando retirada")}
            />
            Aguardando retirada
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedStatuses["Finalizado"]}
              onChange={() => handleStatusChange("Finalizado")}
            />
            Finalizado
          </label>
        </div>
      </div>
      <div className="lista-servicos">
        {filteredServicos.map((servico) => (
          <Servico key={servico.id} servico={servico} onDelete={handleDeleteServico} />
        ))}
      </div>

      {isModalOpen && (
        <NovoServico
          onClose={handleCloseModal}
          onAddServico={handleAddServico}
        />
      )}
    </div>
  );
};

export default Servicos;
