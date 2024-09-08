import React, { useContext,useState } from 'react';
import './Clientes.css';
import NovoCliente from './AddCliente/NovoCliente';
import Cliente from '../../../../imgs/tela_menu/clientes-icon.svg';
import Plus from '../../../../imgs/tela_menu/add-icon.svg';
import Lupa from '../../../../imgs/tela_menu/pesquisa-icon.svg';
import Editar from '../../../../imgs/tela_menu/editar-icon.svg';
import Lixeira from '../../../../imgs/tela_menu/lixeira-icon.svg';
import { ClientesContext } from './ClientesContext';

const Clientes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { clientes, setClientes } = useContext(ClientesContext); // Pega os dados do contexto

    const handleOpenModal = () => {
        setIsModalOpen(true)};
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddCliente = (novoCliente) => {
        setClientes([...clientes, { ...novoCliente, id: clientes.length + 1 }]); // Atualiza o contexto
    };

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
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <th scope="row">{cliente.id}</th>
                                <td>{cliente.nome}</td>
                                <td>{cliente.telefone}</td>
                                <td>{cliente.cpf}</td>
                                <td>
                                    <div className='botoes-acao'>
                                        <img src={Editar} alt='teste' />
                                        <img src={Lixeira} alt='teste' />
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
