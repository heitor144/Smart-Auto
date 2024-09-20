import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FluxoCaixa.css';
import FluxoCaixa_icon from '../../../../imgs/tela_menu/fluxo-caixa-icon.svg';
import Plus from '../../../../imgs/tela_menu/add-icon.svg';
import Lupa from '../../../../imgs/tela_menu/pesquisa-icon.svg';
import Editar from '../../../../imgs/tela_menu/editar-icon.svg';
import Lixeira from '../../../../imgs/tela_menu/lixeira-icon.svg';
import NovoFluxo from './AddFluxoCaixa/NovoFluxo'; 
import EditarFluxoCaixa from './EditarFluxoCaixa/EditarFluxoCaixa'; // Importa o componente de edição

const FluxoCaixa = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Estado para edição
    const [selectedRegistro, setSelectedRegistro] = useState(null); // Registro selecionado para edição
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddRegistro = async (NovoFluxo) => {
        try {
            // Supondo que você tenha uma API para adicionar o registro no backend
            await axios.post('http://localhost:3001/api/fluxoCaixa/fluxoCaixa', NovoFluxo);
            
            // Atualiza a lista de registros após o sucesso na adição
            fetchRegistros(); 
        } catch (error) {
            console.error('Erro ao adicionar o fluxo de caixa:', error);
            setError(error.message);
        }
        setIsModalOpen(false); // Fecha o modal após a adição
    };
    

    const handleEditRegistro = (registro) => {
        setSelectedRegistro(registro);
        setIsEditing(true);
    };

    const handleUpdateRegistro = (registroAtualizado) => {
        setRegistros((prev) =>
            prev.map((r) => (r.id === registroAtualizado.id ? registroAtualizado : r))
        );
        setIsEditing(false);
        setSelectedRegistro(null);
    };

    const handleDeleteRegistro = async (id) => {
        const confirmed = window.confirm("Você realmente deseja excluir este registro?");

        if (confirmed) {
        try {
            await axios.delete(`http://localhost:3001/api/fluxoCaixa/fluxoCaixa/${id}`);
            setRegistros(registros.filter(registro => registro[0] !== id)); // Filtra os registros removendo o selecionado
        } catch (error) {
            console.error('Erro ao deletar o fluxo de caixa:', error);
            setError(error.message);
        }
    }
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

    const formatarData = (dataString) => {
        const data = new Date(dataString);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
    
        return `${dia}/${mes}/${ano}`;
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
                                        <img 
                                            src={Editar} 
                                            alt='editar' 
                                            onClick={() => handleEditRegistro(registro)} 
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <img 
                                            src={Lixeira} 
                                            alt='excluir' 
                                            onClick={() => handleDeleteRegistro(registro[0])} 
                                            style={{ cursor: 'pointer' }}
                                        />
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

            {isEditing && selectedRegistro && (
                <EditarFluxoCaixa
                    registro={selectedRegistro}
                    onClose={() => {
                        setIsEditing(false);
                        setSelectedRegistro(null);
                    }}
                    onUpdateRegistro={handleUpdateRegistro}
                />
            )}
        </div>
    );
};

export default FluxoCaixa;
