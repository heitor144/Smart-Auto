import React from 'react'
import './FluxoCaixa.css'
import FluxoCaixa_icon from '../../../../imgs/tela_menu/fluxo-caixa-icon.svg'
import Plus from '../../../../imgs/tela_menu/add-icon.svg'
import Lupa from '../../../../imgs/tela_menu/pesquisa-icon.svg'
import Detalhes from '../../../../imgs/tela_menu/detalhes-icon.svg'
import Editar from '../../../../imgs/tela_menu/editar-icon.svg'
import Lixeira from '../../../../imgs/tela_menu/lixeira-icon.svg'

const FluxoCaixa = () => {
    // useEffect(() => {
    //     const button = document.querySelector('.add-botao button');
    //     button.classList.add('aparecer');
    // }, []);

    return (
        <div className='con-prin-fluxo'>
            <div className='sidebar'>
                <div className='titulo-pag'>
                    <img src={FluxoCaixa_icon} alt='fluxo-icon' />
                    <p>Fluxo de Caixa</p>
                </div>
                <div className='add-botao'>
                    <button>
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

                <table class="table table-hover">
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
                        <tr>
                            <th scope="row">1</th>
                            <td>xx-xx-xxxx</td>
                            <td>Saída</td>
                            <td>Compra de materiais</td>
                            <td>Salário</td>
                            <td>R$3.000,00</td>
                            <td>R$3.000,00</td>
                            <td>
                                <div className='botoes-acao'>
                                    <img src={Detalhes} alt='teste' />
                                    <img src={Editar} alt='teste' />
                                    <img src={Lixeira} alt='teste' />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>xx-xx-xxxx</td>
                            <td>Saída</td>
                            <td>Serviço de pintura</td>
                            <td>Serviço</td>
                            <td>R$1.500,00</td>
                            <td>R$1.350,00</td>
                            <td>
                                <div className='botoes-acao'>
                                    <img src={Detalhes} alt='teste' />
                                    <img src={Editar} alt='teste' />
                                    <img src={Lixeira} alt='teste' />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>xx-xx-xxxx</td>
                            <td>Saída</td>
                            <td>Compra de materiais</td>
                            <td>Material</td>
                            <td>R$500,00</td>
                            <td>R$500,00</td>
                            <td><div className='botoes-acao'>
                                <img src={Detalhes} alt='teste' />
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

export default FluxoCaixa
