import React, { useState } from 'react';
import './FluxoCaixa.css';
import FluxoCaixa_icon from '../../../../imgs/tela_menu/fluxo-caixa-icon.svg';
import Plus from '../../../../imgs/tela_menu/add-icon.svg';
import Lupa from '../../../../imgs/tela_menu/pesquisa-icon.svg';
import Detalhes from '../../../../imgs/tela_menu/detalhes-icon.svg';
import Editar from '../../../../imgs/tela_menu/editar-icon.svg';
import Lixeira from '../../../../imgs/tela_menu/lixeira-icon.svg';
import NovoFluxo from './AddFluxoCaixa/NovoFluxo'; // Novo componente de modal

const FluxoCaixa = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [registros, setRegistros] = useState([
        { id: 1, data: 'xx-xx-xxxx', tipo: 'Saída', descricao: 'Compra de materiais', categoria: 'Material', valorBruto: 3000, valorLiquido: 3000 },
        { id: 2, data: 'xx-xx-xxxx', tipo: 'Saída', descricao: 'Serviço de pintura', categoria: 'Serviço', valorBruto: 1500, valorLiquido: 1350 },
        { id: 3, data: 'xx-xx-xxxx', tipo: 'Saída', descricao: 'Compra de materiais', categoria: 'Material', valorBruto: 500, valorLiquido: 500 },
    ]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddRegistro = (NovoFluxo) => {
        setRegistros([...registros, { ...NovoFluxo, id: registros.length + 1 }]);
    };

    return (
        <div className='con-prin-fluxo'>
            <div className='sidebar'>
                <div className='titulo-pag'>
                    <img src={FluxoCaixa_icon} alt='fluxo-icon' />
                    <p>Fluxo de Caixa</p>
                </div>
                <div className='add-botao'>
                    <button onClick={handleOpenModal}>
                        <img src={Plus} alt='plus-icon' />
                        Adicionar novo
                    </button>
                </div>
            </div>
            <div className='lista-fluxo'>
                <div className='input-container'>
                    <input type="text" placeholder="Digite o que busca..." />
                    <img src={Lupa} alt='Pesquisar' className="input-icon" />
                </div>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Data</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Valor bruto</th>
                            <th scope="col">Valor líquido</th>
                            <th scope="col">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registros.map((registro) => (
                            <tr key={registro.id}>
                                <th scope="row">{registro.id}</th>
                                <td>{registro.data}</td>
                                <td>{registro.tipo}</td>
                                <td>{registro.descricao}</td>
                                <td>{registro.categoria}</td>
                                <td>R${registro.valorBruto}</td>
                                <td>R${registro.valorLiquido}</td>
                                <td>
                                    <div className='botoes-acao'>
                                        <img src={Detalhes} alt='detalhes' />
                                        <img src={Editar} alt='editar' />
                                        <img src={Lixeira} alt='excluir' />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <NovoFluxo onClose={handleCloseModal} onAddRegistro={handleAddRegistro} />
            )}
        </div>
    );
};

export default FluxoCaixa;
