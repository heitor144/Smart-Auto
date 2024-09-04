import React from "react";
import "./Servicos.css";
import Servicos_icon from "../../../../imgs/tela_menu/servicos-icon.svg";
import Plus from "../../../../imgs/tela_menu/add-icon.svg";
import Lupa from "../../../../imgs/tela_menu/pesquisa-icon.svg";
import Servico from "../Servicos/Servico/Servico"; // Importa o componente Servico

const servicosFicticios = [
  {
    id: 1,
    status: "Não iniciado",
    cliente: "Cliente 1",
    veiculo: "Veículo 1",
    valorTotal: 500.0,
    valorPago: 350.0,
    dataChegada: "01/09/2024",
    previsaoTermino: "05/09/2024",
    descricao: "Amassado nas portas laterais esquerdas.",
    funcionario: "Funcionário 1",
    imagem: "https://mecanicagarrett.com.br/wp-content/uploads/2020/11/diferen%C3%A7a-entre-lanternagem-e-funilaria.jpg",
  },
  {
    id: 2,
    status: "Em andamento",
    cliente: "Cliente",
    veiculo: "Veículo 1",
    valorTotal: 500.0,
    valorPago: 350.0,
    dataChegada: "01/09/2024",
    previsaoTermino: "05/09/2024",
    descricao: "Pintura na ponta do porta mala.",
    funcionario: "Funcionário 1",
    imagem: "https://i.servimg.com/u/f45/20/06/57/97/tm/20190411.jpg",
  },
  {
    id: 3,
    status: "Em andamento",
    cliente: "Cliente 1",
    veiculo: "Veículo 1",
    valorTotal: 500.0,
    valorPago: 350.0,
    dataChegada: "01/09/2024",
    previsaoTermino: "05/09/2024",
    descricao: "Pintura total do capô.",
    funcionario: "Funcionário 1",
    imagem: "https://st4.depositphotos.com/3977247/37822/i/1600/depositphotos_378223258-stock-photo-grey-car-used-peeling-gray.jpg",
  },
  {
    id: 4,
    status: "Em andamento",
    cliente: "Cliente 1",
    veiculo: "Veículo 1",
    valorTotal: 500.0,
    valorPago: 350.0,
    dataChegada: "01/09/2024",
    previsaoTermino: "05/09/2024",
    descricao: "Troca de óleo e revisão completa.",
    funcionario: "Funcionário 1",
    imagem: "https://mecanicagarrett.com.br/wp-content/uploads/2020/11/diferen%C3%A7a-entre-lanternagem-e-funilaria.jpg",
  },
  {
    id: 5,
    status: "Em andamento",
    cliente: "Cliente 1",
    veiculo: "Veículo 1",
    valorTotal: 500.0,
    valorPago: 350.0,
    dataChegada: "01/09/2024",
    previsaoTermino: "05/09/2024",
    descricao: "Troca de óleo e revisão completa.",
    funcionario: "Funcionário 1",
    imagem: "https://mecanicagarrett.com.br/wp-content/uploads/2020/11/diferen%C3%A7a-entre-lanternagem-e-funilaria.jpg",
  },
  {
    id: 6,
    status: "Pronto",
    cliente: "Cliente 1",
    veiculo: "Veículo 1",
    valorTotal: 500.0,
    valorPago: 350.0,
    dataChegada: "01/09/2024",
    previsaoTermino: "05/09/2024",
    descricao: "Troca de óleo e revisão completa.",
    funcionario: "Funcionário 1",
    imagem: "https://mecanicagarrett.com.br/wp-content/uploads/2020/11/diferen%C3%A7a-entre-lanternagem-e-funilaria.jpg",
  },{
    id: 6,
    status: "Pronto",
    cliente: "Cliente 1",
    veiculo: "Veículo 1",
    valorTotal: 500.0,
    valorPago: 350.0,
    dataChegada: "01/09/2024",
    previsaoTermino: "05/09/2024",
    descricao: "Troca de óleo e revisão completa.",
    funcionario: "Funcionário 1",
    imagem: "https://mecanicagarrett.com.br/wp-content/uploads/2020/11/diferen%C3%A7a-entre-lanternagem-e-funilaria.jpg",
  },
  // Adicione mais objetos de serviço fictícios aqui...
];

const Servicos = () => {
  return (
    <div className="con-prin-serv">
      <div className="sidebar">
        <div className="titulo-pag">
          <img src={Servicos_icon} alt="servicos-icon" />
          <p>Serviços</p>
        </div>
        <div className="add-botao">
          <button>
            <img src={Plus} alt="plus-icon" />
            Adicionar novo
          </button>
        </div>
        <div className="input-container-serv">
          <input type="text" placeholder="Digite o que busca..." />
          <img src={Lupa} alt="Pesquisar" className="input-icon" />
        </div>
      </div>
      <div className="lista-servicos">
        {servicosFicticios.map((servico) => (
          <Servico key={servico.id} servico={servico} />
        ))}
      </div>
    </div>
  );
};

export default Servicos;
