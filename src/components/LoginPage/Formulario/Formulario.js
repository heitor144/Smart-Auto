import React, { useState } from 'react';
import './Formulario.css';

export default function Formulario({ onLogin }) {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpa mensagens de erro anteriores

        try {
            const response = await fetch('http://localhost:3001/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, senha }),
            });

            if (response.ok) {
                const data = await response.json();
                onLogin(data.token); // Chama a função passada como props com o token
            } else {
                setError('Login falhou. Verifique suas credenciais.'); // Exibe mensagem de erro
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Erro ao conectar ao servidor.');
        }
    };

    return (
        <div className='formulario'>
            <p>Bem vindo(a)!</p>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Login:</label>
                <input 
                    type="text" 
                    value={login} 
                    onChange={(e) => setLogin(e.target.value)} 
                    placeholder="Digite seu login" 
                    className="input-login" // Adicione uma classe CSS se necessário
                    required 
                />
                <label>Senha:</label>
                <input 
                    type="password" 
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)} 
                    placeholder="Digite sua senha" 
                    className="input-senha" // Adicione uma classe CSS se necessário
                    required 
                />
                <button type="submit" className="botao-entrar">Entrar</button> {/* Classe de formatação */}
                {error && <p className="error">{error}</p>} {/* Exibe mensagem de erro */}
            </form>
        </div>
    );
}
