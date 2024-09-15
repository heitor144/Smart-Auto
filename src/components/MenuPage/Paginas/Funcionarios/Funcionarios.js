import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Funcionarios.css";
import NovoFuncionario from "./AddFuncionario/NovoFuncionario";
import DetalhesFuncionario from './DetalhesFuncionario/DetalhesFuncionario';
import EditarFuncionario from './EditarFuncionario/EditarFuncionario';
import Funcionario from "../../../../imgs/tela_menu/funcionarios-icon.svg";
import Plus from "../../../../imgs/tela_menu/add-icon.svg";
import Lupa from "../../../../imgs/tela_menu/pesquisa-icon.svg";
import Detalhes from "../../../../imgs/tela_menu/detalhes-icon.svg";
import Editar from "../../../../imgs/tela_menu/editar-icon.svg";
import Lixeira from "../../../../imgs/tela_menu/lixeira-icon.svg";

const Funcionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFuncionarios = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/api/funcionarios/funcionarios");
      setFuncionarios(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleViewDetails = (funcionario) => {
    setSelectedFuncionario(funcionario);
    setIsEditing(false);
  };

  const handleAddFuncionario = async (novoFuncionario) => {
    try {
      await axios.post("http://localhost:3001/api/funcionarios/funcionarios", novoFuncionario);
      await fetchFuncionarios();
      handleCloseModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditFuncionario = (funcionario) => {
    setSelectedFuncionario(funcionario);
    setIsEditing(true);
  };

  const handleUpdateFuncionario = async (funcionarioAtualizado) => {
    try {
      await axios.put(`http://localhost:3001/api/funcionarios/funcionarios/${funcionarioAtualizado[0]}`, funcionarioAtualizado);
      await fetchFuncionarios();
      setIsEditing(false);
      setSelectedFuncionario(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteFuncionario = async (id) => {
    const confirmed = window.confirm("Você realmente deseja excluir este funcionário?");
    
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/funcionarios/funcionarios/${id}`);
        await fetchFuncionarios();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  function formatarCPF(cpf) {
    if (cpf) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return cpf;
  }

  function formatarData(data) {
    if (!data) return "";

    const dateObj = new Date(data);
    const dia = String(dateObj.getDate()).padStart(2, "0");
    const mes = String(dateObj.getMonth() + 1).padStart(2, "0");
    const ano = dateObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  const filteredFuncionarios = funcionarios.filter(
    (funcionario) =>
      funcionario[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatarCPF(funcionario[2]).includes(searchTerm) ||
      funcionario[4].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="con-prin-func">
      <div className="sidebar">
        <div className="titulo-pag">
          <img src={Funcionario} alt="funcionario-icon" />
          <p>Funcionários</p>
        </div>
        <div className="add-botao">
          <button onClick={handleOpenModal}>
            <img src={Plus} alt="plus-icon"></img>
            Adicionar novo
          </button>
        </div>
      </div>
      <div className="lista-funcionarios">
        <div className="input-container">
          <input
            type="text"
            placeholder="Digite o que busca..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <img src={Lupa} alt="Pesquisar" className="input-icon" />
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome Completo</th>
              <th scope="col">CPF</th>
              <th scope="col">Nascimento</th>
              <th scope="col">Cargo</th>
              <th scope="col">Salário</th>
              <th scope="col">Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredFuncionarios.map((funcionario) => (
              <tr key={funcionario[0]}>
                <th scope="row">{funcionario[0]}</th>
                <td>{funcionario[1]}</td>
                <td>{formatarCPF(funcionario[2])}</td>
                <td>{formatarData(funcionario[3])}</td>
                <td>{funcionario[4]}</td>
                <td>
                  R${" "}
                  {typeof funcionario[5] === "number"
                    ? funcionario[5].toFixed(2)
                    : "N/A"}
                </td>
                <td>
                  <div className="botoes-acao">
                    <img
                      src={Detalhes}
                      alt="Ver Detalhes"
                      onClick={() => handleViewDetails(funcionario)}
                    />
                    <img
                      src={Editar}
                      alt="Editar"
                      onClick={() => handleEditFuncionario(funcionario)}
                    />
                    <img
                      src={Lixeira}
                      alt="Deletar"
                      onClick={() => handleDeleteFuncionario(funcionario[0])}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mostrar modal de detalhes ou edição */}
      {selectedFuncionario && !isEditing && (
        <DetalhesFuncionario 
          funcionario={selectedFuncionario} 
          onClose={() => setSelectedFuncionario(null)} 
        />
      )}
      
      {isModalOpen && (
        <NovoFuncionario
          onClose={handleCloseModal}
          onAddFuncionario={handleAddFuncionario}
        />
      )}

      {isEditing && selectedFuncionario && (
        <EditarFuncionario
          funcionario={selectedFuncionario}
          onClose={() => {
            setIsEditing(false);
            setSelectedFuncionario(null);
          }}
          onUpdateFuncionario={handleUpdateFuncionario}
        />
      )}
    </div>
  );
};

export default Funcionarios;
