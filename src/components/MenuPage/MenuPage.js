import "./MenuPage.css";
import Header from "./Header/Header";
import Rodape from "./Rodape/Rodape";
import Navbar from "./Navbar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Funcionarios from "../MenuPage/Paginas/Funcionarios/Funcionarios";
import Clientes from "../MenuPage/Paginas/Clientes/Clientes";
import Servicos from "../MenuPage/Paginas/Servicos/Servicos";
import FluxoCaixa from "../MenuPage/Paginas/FluxoCaixa/FluxoCaixa";

export default function MenuPage({ onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove o token do localStorage
        onLogout(); // Chama a função passada via props para redefinir a autenticação
        navigate('/'); // Redireciona para a página de login
    };

    return (
        <div>
            <Header onLogout={handleLogout} />
            <Navbar />
            <Routes>
                <Route path="/funcionarios" element={<Funcionarios />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/servicos" element={<Servicos />} />
                <Route path="/fluxocaixa" element={<FluxoCaixa />} />
            </Routes>
            <Rodape />
        </div>
    );
}
