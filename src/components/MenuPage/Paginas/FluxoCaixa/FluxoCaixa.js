import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddRegistro = (NovoFluxo) => {
        setRegistros([...registros, { ...NovoFluxo, id: registros.length + 1 }]);
    };

    const formatarData = (dataString) => {
        const data = new Date(dataString);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
    
        return `${dia}/${mes}/${ano}`;
    };
    

    const fetchRegistros = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3001/api/fluxoCaixa/fluxoCaixa');
            setRegistros(response.data.map((item, index) => ({ ...item, id: index + 1 })));
        } catch (error) {
            console.error('Erro ao buscar fluxos de caixa:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistros();
    }, []);

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
                {loading && <p>Carregando...</p>}
                {error && <p>Erro: {error}</p>}
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
                            <tr key={registro[0]}>
                                <th scope="row">{registro[0]}</th>
                                <td>{formatarData(registro[6])}</td>

                                <td>{registro[3]}</td>
                                <td>{registro[2]}</td>
                                <td>{registro[1]}</td>
                                <td>R${registro[4]}</td>
                                <td>R${registro[5]}</td>
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
