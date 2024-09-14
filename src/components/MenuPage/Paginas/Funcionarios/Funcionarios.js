import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importando o Axios
import './Funcionarios.css';
import NovoFuncionario from './AddFuncionario/NovoFuncionario';
import Funcionario from '../../../../imgs/tela_menu/funcionarios-icon.svg';
import Plus from '../../../../imgs/tela_menu/add-icon.svg';
import Lupa from '../../../../imgs/tela_menu/pesquisa-icon.svg';
import Detalhes from '../../../../imgs/tela_menu/detalhes-icon.svg';
import Editar from '../../../../imgs/tela_menu/editar-icon.svg';
import Lixeira from '../../../../imgs/tela_menu/lixeira-icon.svg';


const Funcionarios = () => {
    const [funcionarios, setFuncionarios] = useState([]); // Estado local para armazenar os funcionários
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Adiciona um estado de carregamento e erro
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Função para buscar os dados da API
        const fetchFuncionarios = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/funcionarios/funcionarios'); // Usando Axios para fazer a requisição
                setFuncionarios(response.data); // Atualiza o estado com os funcionários vindos da API
                console.log(response.data);
                setLoading(false); // Atualiza o estado de carregamento
            } catch (error) {
                setError(error.message);
                setLoading(false); // Atualiza o estado de carregamento em caso de erro
            }
        };

        fetchFuncionarios(); // Chama a função quando o componente monta
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddFuncionario = (novoFuncionario) => {
        setFuncionarios([...funcionarios, { ...novoFuncionario, id: funcionarios.length + 1 }]);
    };

    function formatarCPF(cpf) {
        if (cpf) {
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
        return cpf;
    }
    
    function formatarData(data) {
        if (!data) return '';
    
        const dateObj = new Date(data); // Cria um objeto Date a partir do valor recebido
        const dia = String(dateObj.getDate()).padStart(2, '0'); // Obtém o dia e garante 2 dígitos
        const mes = String(dateObj.getMonth() + 1).padStart(2, '0'); // Obtém o mês (adiciona +1 porque o mês começa em 0)
        const ano = dateObj.getFullYear(); // Obtém o ano
    
        return `${dia}/${mes}/${ano}`; // Retorna no formato dd/MM/yyyy
    }
    

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
                            <th scope="col">CPF</th>
                            <th scope="col">Nascimento</th>
                            <th scope="col">Cargo</th>
                            <th scope="col">Salário</th>
                            <th scope="col">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarios.map((funcionario) => (
                            <tr key={funcionario.id}>
                                <th scope="row">{funcionario[0]}</th>
                                <td>{funcionario[1]}</td>
                                <td>{formatarCPF(funcionario[2])}</td>
                                <td>{formatarData(funcionario[3])}</td>
                                <td>{funcionario[4]}</td>
                                <td>R${funcionario[5].toFixed(2)}</td>
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
