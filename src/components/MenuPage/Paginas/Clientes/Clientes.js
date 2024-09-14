import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importando o Axios
import './Clientes.css';
import NovoCliente from './AddCliente/NovoCliente';
import Cliente from '../../../../imgs/tela_menu/clientes-icon.svg';
import Plus from '../../../../imgs/tela_menu/add-icon.svg';
import Lupa from '../../../../imgs/tela_menu/pesquisa-icon.svg';
import Editar from '../../../../imgs/tela_menu/editar-icon.svg';
import Lixeira from '../../../../imgs/tela_menu/lixeira-icon.svg';


const Clientes = () => {
    const [clientes, setClientes] = useState([]); // Estado local para armazenar os clientes
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Adiciona um estado de carregamento e erro
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Função para buscar os dados da API
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/clientes/clientes'); // Usando Axios para fazer a requisição
                setClientes(response.data); // Atualiza o estado com os clientes vindos da API
                console.log(response.data);
                setLoading(false); // Atualiza o estado de carregamento
            } catch (error) {
                setError(error.message);
                setLoading(false); // Atualiza o estado de carregamento em caso de erro
            }
        };

        fetchClientes(); // Chama a função quando o componente monta
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddCliente = (novoCliente) => {
        setClientes([...clientes, { ...novoCliente, id: clientes.length + 1 }]); // Atualiza o estado
    };

    if (loading) {
        return <div>Carregando...</div>; // Exibe mensagem enquanto carrega
    }

    if (error) {
        return <div>Erro: {error}</div>; // Exibe mensagem de erro
    }

    return (
        <div className='con-prin-clientes'>
            <div className='sidebar'>
                <div className='titulo-pag'>
                    <img src={Cliente} alt='cliente-icon' />
                    <p>Clientes</p>
                </div>
                <div className='add-botao'>
                    <button onClick={handleOpenModal}>
                        <img src={Plus} alt='plus-icon'></img>
                        Adicionar novo
                    </button>
                </div>
            </div>
            <div className='lista-clientes'>
                <div className='input-container'>
                    <input type="text" placeholder="Digite o que busca..." />
                    <img src={Lupa} alt='Pesquisar' className="input-icon" />
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
                        {clientes.map((cliente, index) => (
                            <tr key={index}>
                                <th scope="row">{cliente[0]}</th>
                                <td>{cliente[1]}</td>
                                <td>{cliente[2]}</td>
                                <td>{cliente[3]}</td>
                                <td>
                                    <div className='botoes-acao'>
                                        <img src={Editar} alt='Editar' />
                                        <img src={Lixeira} alt='Excluir' />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            {isModalOpen && (
                <NovoCliente onClose={handleCloseModal} onAddCliente={handleAddCliente} />
            )}
        </div>
    );
};

export default Clientes;
