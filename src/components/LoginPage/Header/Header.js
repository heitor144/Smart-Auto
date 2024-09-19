import logo from '../../../imgs/logo.svg'
import './Header.css'

export default function Header() {
    return (
        <header className='header-login'>
            <img src={logo}></img>
            <div>
                <h2>SMART AUTO</h2>
                <p>GESTÃO DE SERVIÇOS</p>
            </div>
        </header>
    );
}