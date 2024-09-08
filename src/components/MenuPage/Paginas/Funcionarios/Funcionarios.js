import React, { useState } from 'react';
import './Funcionarios.css';
import NovoFuncionario from './AddFuncionario/NovoFuncionario';
import Funcionario from '../../../../imgs/tela_menu/funcionarios-icon.svg';
import Plus from '../../../../imgs/tela_menu/add-icon.svg';
import Lupa from '../../../../imgs/tela_menu/pesquisa-icon.svg';
import Detalhes from '../../../../imgs/tela_menu/detalhes-icon.svg';
import Editar from '../../../../imgs/tela_menu/editar-icon.svg';
import Lixeira from '../../../../imgs/tela_menu/lixeira-icon.svg';

const Funcionarios = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [funcionarios, setFuncionarios] = useState([
        { id: 1, nome: 'Mark Otto', matricula: 'xxxxxxxxxx', cpf: '999999999-99', nascimento: '11-11-1111', cargo: 'Pintor' },
        { id: 2, nome: 'Jacob', matricula: 'yyyyyyyyyy', cpf: '999999999-99', nascimento: '11-11-1111', cargo: 'Funileiro' },
        { id: 3, nome: 'Larry the bird', matricula: 'zzzzzzzzzz', cpf: '999999999-99', nascimento: '11-11-1111', cargo: 'Supervisor' }
    ]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddFuncionario = (novoFuncionario) => {
        setFuncionarios([...funcionarios, { ...novoFuncionario, id: funcionarios.length + 1 }]);
    };

    return (
        <div className='con-prin-func'>
            <div className='sidebar'>
                <div className='titulo-pag'>
                    <img src={Funcionario} alt='funcionario-icon' />
                    <p>Funcionários</p>
                </div>
                <div className='add-botao'>
                    <button onClick={handleOpenModal}>
                        <img src={Plus} alt='plus-icon'></img>
                        Adicionar novo
                    </button>
                </div>
            </div>
            <div className='lista-funcionarios'>
                <div className='input-container'>
                    <input type="text" placeholder="Digite o que busca..." />
                    <img src={Lupa} alt='Pesquisar' className="input-icon" />
                </div>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome Completo</th>
                            <th scope="col">Matrícula</th>
                            <th scope="col">CPF</th>
                            <th scope="col">Nascimento</th>
                            <th scope="col">Cargo</th>
                            <th scope="col">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarios.map((funcionario) => (
                            <tr key={funcionario.id}>
                                <th scope="row">{funcionario.id}</th>
                                <td>{funcionario.nome}</td>
                                <td>{funcionario.matricula}</td>
                                <td>{funcionario.cpf}</td>
                                <td>{funcionario.nascimento}</td>
                                <td>{funcionario.cargo}</td>
                                <td>
                                    <div className='botoes-acao'>
                                        <img src={Detalhes} alt='teste' />
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
                <NovoFuncionario onClose={handleCloseModal} onAddFuncionario={handleAddFuncionario} />
            )}
        </div>
    );
};

export default Funcionarios;
