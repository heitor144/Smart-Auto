import React from 'react'
import './Clientes.css'
import Cliente from '../../../../imgs/tela_menu/clientes-icon.svg'
import Plus from '../../../../imgs/tela_menu/add-icon.svg'
import Lupa from '../../../../imgs/tela_menu/pesquisa-icon.svg'
import Editar from '../../../../imgs/tela_menu/editar-icon.svg'
import Lixeira from '../../../../imgs/tela_menu/lixeira-icon.svg'

const Clientes = () => {
    // useEffect(() => {
    //     const button = document.querySelector('.add-botao button');
    //     button.classList.add('aparecer');
    // }, []);

    return (
        <div className='con-prin-clientes'>
            <div className='sidebar'>
                <div className='titulo-pag'>
                    <img src={Cliente} alt='cliente-icon' />
                    <p>Clientes</p>
                </div>
                <div className='add-botao'>
                    <button>
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

                <table class="table table-hover">
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
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark Otto</td>
                            <td>xxxxxxxxxx</td>
                            <td>999999999-99</td>
                            <td>
                                <div className='botoes-acao'>
                                    <img src={Editar} alt='teste' />
                                    <img src={Lixeira} alt='teste' />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>yyyyyyyyyy</td>
                            <td>999999999-99</td>
                            <td>
                                <div className='botoes-acao'>
                                    <img src={Editar} alt='teste' />
                                    <img src={Lixeira} alt='teste' />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry the bird</td>
                            <td>zzzzzzzzzz</td>
                            <td>999999999-99</td>
                            <td><div className='botoes-acao'>
                                <img src={Editar} alt='teste' />
                                <img src={Lixeira} alt='teste' />
                            </div></td>

                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Clientes
