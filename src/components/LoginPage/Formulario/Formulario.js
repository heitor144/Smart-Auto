import './Formulario.css'

export default function Formulario() {
    return (
        <div className='formulario'>
            <p>Bem vindo(a)!</p>
            <h2>Login</h2>
            <p>Para entrar, utilize sua matrícula e senha.</p>
            <form>
                <label>Usuário:</label>
                <input type="text" placeholder="Digite sua matrícula"></input>
                <label>Senha:</label>
                <input type="password" placeholder="Digite sua senha"></input>
                <a href="https:www.google.com.br">Esqueceu a senha?</a>
                <button>Entrar</button>
            </form>
        </div>
    );
}