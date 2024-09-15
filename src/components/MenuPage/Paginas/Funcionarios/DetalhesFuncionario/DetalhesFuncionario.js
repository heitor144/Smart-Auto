import React from "react";
import "./DetalhesFuncionario.css"; // Estilos para o modal de detalhes
import Funcionario from "../../../../../imgs/tela_menu/funcionarios-icon.svg";
import InputMask from 'react-input-mask';

const DetalhesFuncionario = ({ funcionario, onClose }) => {
  // Função para formatar a data ISO 8601 para DD/MM/YYYY
  const formatDate = (isoDateStr) => {
    if (!isoDateStr) return ''; // Se a data não estiver presente

    const date = new Date(isoDateStr);
    
    if (isNaN(date.getTime())) return ''; // Se a data não for válida

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses são baseados em zero
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formattedDateOfBirth = formatDate(funcionario[3]);

  return (
    <div className="modal-background">
      <div className="modal-content-func">
        <header>
          <img src={Funcionario} alt="Funcionario" />
          <h2>Detalhes do Funcionário</h2>
        </header>

        <form>
          <label>Nome Completo:</label>
          <input type="text" value={funcionario[1]} readOnly />
          
          <label>CPF:</label>
          <InputMask
            mask="999.999.999-99"
            value={funcionario[2]}
            readOnly
          >
            {(inputProps) => <input type="text" {...inputProps} />}
          </InputMask>
          
          <label>Data de Nascimento:</label>
          <InputMask
            mask="99/99/9999"
            value={formattedDateOfBirth}
            readOnly
          >
            {(inputProps) => <input type="text" {...inputProps} />}
          </InputMask>
          
          <label>Cargo:</label>
          <input type="text" value={funcionario[4]} readOnly />
          
          <label>Salário:</label>
          <input
            type="text"
            value={`R$ ${funcionario[5].toFixed(2)}`}
            readOnly
          />
        </form>
        <div className="botao-fechar">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default DetalhesFuncionario;
