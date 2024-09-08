import "./App.css";
import { Route, Routes } from "react-router-dom";
// import LoginPage from './components/LoginPage/LoginPage'
// import MenuPage from './components/MenuPage/MenuPage'
import Funcionarios from "./components/MenuPage/Paginas/Funcionarios/Funcionarios";
import Clientes from "./components/MenuPage/Paginas/Clientes/Clientes";
import Servicos from "./components/MenuPage/Paginas/Servicos/Servicos";
import FluxoCaixa from "./components/MenuPage/Paginas/FluxoCaixa/FluxoCaixa";
import Header from "./components/MenuPage/Header/Header";
import Navbar from "./components/MenuPage/Navbar/Navbar";
import Rodape from "./components/LoginPage/Rodape/Rodape";
import { ClientesProvider } from "./components/MenuPage/Paginas/Clientes/ClientesContext";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <ClientesProvider>
        <Routes>
          <Route path="/funcionarios" element={<Funcionarios />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/fluxocaixa" element={<FluxoCaixa />} />
        </Routes>
      </ClientesProvider>
      <Rodape />
    </div>
  );
}

export default App;
