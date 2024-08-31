import Formulario from './Formulario/Formulario'
import Header from './Header/Header'
import Carousel from './Carrossel/Carousel';
import Rodape from './Rodape/Rodape'
import './LoginPage.css'

export default function LoginPage() {
    return (
        <div className='wrapper'>
            <Header />
            <div className='main-content'>
                <body className='body'>
                    <Formulario />
                    <Carousel />
                </body>
            </div>
            <Rodape />
        </div>
    );
}