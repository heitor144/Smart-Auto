import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom'
import Icon1 from '../../../imgs/tela_menu/funcionarios-icon.svg';
import Icon2 from '../../../imgs/tela_menu/clientes-icon.svg';
import Icon3 from '../../../imgs/tela_menu/servicos-icon.svg';
import Icon4 from '../../../imgs/tela_menu/fluxo-caixa-icon.svg';

export default function Navbar() {
    return (
        <div className='conteudo'>
            <nav className="navbar">
                <ul className="navbar-list">
                    <NavLink to='/funcionarios' className='navbar-item'>
                        <img src={Icon1} alt='Funcionários' />
                        <p>Funcionários</p>
                    </NavLink>
                    <NavLink to='/clientes' className='navbar-item'>
                        <img src={Icon2} alt='Clientes' />
                        <p>Clientes</p>
                    </NavLink>
                    <NavLink to='/servicos' className='navbar-item'>
                        <img src={Icon3} alt='Serviços' />
                        <p>Serviços</p>
                    </NavLink>
                    <NavLink to='/fluxocaixa' className='navbar-item'>
                        <img src={Icon4} alt='Fluxo de Caixa' />
                        <p>Fluxo de Caixa</p>
                    </NavLink>
                </ul>
            </nav>
        </div>
    );
}
