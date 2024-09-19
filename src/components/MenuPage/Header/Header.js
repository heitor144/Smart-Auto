import logo from '../../../imgs/logo.svg';
import './Header.css';
import Logout from '../../../imgs/tela_menu/logout-icon.svg';

export default function Header({ onLogout }) {
    return (
        <header className='header'>
            <img src={logo} alt="Logo" />
            <div>
                <h2>SMART AUTO</h2>
                <p>GESTÃO DE SERVIÇOS</p>
            </div>
            <div className='exit' onClick={onLogout}>
                <img src={Logout} alt="Logout" />
                <a>Sair</a>
            </div>
        </header>
    );
}
