import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Clientes.css";
import NovoCliente from "./AddCliente/NovoCliente";
import EditarCliente from "./EditarCliente/EditarCliente"; // Criar esse componente semelhante ao EditarFuncionario
import Cliente from "../../../../imgs/tela_menu/clientes-icon.svg";
import Plus from "../../../../imgs/tela_menu/add-icon.svg";
import Lupa from "../../../../imgs/tela_menu/pesquisa-icon.svg";
import Editar from "../../../../imgs/tela_menu/editar-icon.svg";
import Lixeira from "../../../../imgs/tela_menu/lixeira-icon.svg";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3001/api/clientes/clientes"
      );
      setClientes(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddCliente = async (novoCliente) => {
    try {
      await fetchClientes();
      handleCloseModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditCliente = (cliente) => {
    setSelectedCliente(cliente);
    setIsEditing(true);
  };

  const handleUpdateCliente = async (clienteAtualizado) => {
    try {
      await fetchClientes();
      setIsEditing(false);
      setSelectedCliente(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteCliente = async (id) => {
    const confirmed = window.confirm(
      "Você realmente deseja excluir este cliente?"
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/clientes/clientes/${id}`);
        await fetchClientes();
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
      return cpf
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return cpf;
  }

  function formatarTelefone(telefone) {
    if (telefone) {
      return telefone
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
    return telefone;
  }

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatarCPF(cliente[3]).includes(searchTerm)
  );

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="con-prin-clientes">
      <div className="sidebar">
        <div className="titulo-pag">
          <img src={Cliente} alt="cliente-icon" />
          <p>Clientes</p>
        </div>
        <div className="add-botao">
          <button onClick={handleOpenModal}>
            <img src={Plus} alt="plus-icon"></img>
            Adicionar novo
          </button>
        </div>
      </div>
      <div className="lista-clientes">
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
              <th scope="col">Telefone</th>
              <th scope="col">CPF</th>
              <th scope="col">Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.map((cliente) => (
              <tr key={cliente[0]}>
                <th scope="row">{cliente[0]}</th>
                <td>{cliente[1]}</td>
                <td>{formatarTelefone(cliente[2])}</td>
                <td>{formatarCPF(cliente[3])}</td>
                <td>
                  <div className="botoes-acao">
                    <img
                      src={Editar}
                      alt="Editar"
                      onClick={() => handleEditCliente(cliente)}
                    />
                    <img
                      src={Lixeira}
                      alt="Excluir"
                      onClick={() => handleDeleteCliente(cliente[0])}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <NovoCliente
          onClose={handleCloseModal}
          onAddCliente={handleAddCliente}
        />
      )}

      {isEditing && selectedCliente && (
        <EditarCliente
          cliente={selectedCliente}
          onClose={() => {
            setIsEditing(false);
            setSelectedCliente(null);
          }}
          onUpdateCliente={handleUpdateCliente}
        />
      )}
    </div>
  );
};

export default Clientes;
