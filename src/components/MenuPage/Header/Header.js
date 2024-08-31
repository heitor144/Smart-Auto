import logo from '../../../imgs/logo.svg'
import './Header.css'
import Logout from '../../../imgs/tela_menu/logout-icon.svg'

export default function Header() {
    return (
        <header className='header'>
            <img src={logo}></img>
            <div>
                <h2>SMART AUTO</h2>
                <p>GESTÃO DE SERVIÇOS</p>
            </div>
            <div className='exit'>
            <img src={Logout} />
                <a>Sair</a>
            </div>
        </header>
    );
}