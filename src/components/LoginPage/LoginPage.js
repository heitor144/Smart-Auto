import React from 'react';
import { useNavigate } from 'react-router-dom';
import Formulario from './Formulario/Formulario';
import Header from './Header/Header';
import Carousel from './Carrossel/Carousel';
import Rodape from './Rodape/Rodape';
import './LoginPage.css';

export default function LoginPage({ onLogin }) {
    const navigate = useNavigate();

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        console.log("Usuário logado com o token:", token);
        onLogin(token); // Chama a função onLogin passada via props
        navigate('/funcionarios'); // Redireciona para a página de funcionários
    };

    return (
        <div className='wrapper'>
            <Header />
            <div className='main-content'>
                <div className='body'>
                    <Formulario onLogin={handleLogin} />
                    <Carousel />
                </div>
            </div>
            <Rodape />
        </div>
    );
}
