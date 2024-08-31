import './App.css';
import { Route, Routes } from 'react-router-dom'
import LoginPage from './components/LoginPage/LoginPage'
import MenuPage from './components/MenuPage/MenuPage'
import Funcionarios from './components/MenuPage/Paginas/Funcionarios/Funcionarios';
import Clientes from './components/MenuPage/Paginas/Clientes/Clientes';
import Header from './components/MenuPage/Header/Header';
import Navbar from './components/MenuPage/Navbar/Navbar';
import Rodape from './components/LoginPage/Rodape/Rodape';


function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/funcionarios" element={<Funcionarios />} />
        {/*<Route path="/clientes" element={<Clientes />} />
         <Route path="/list" element={<List />} />
        <Route path="/orders" element={<Orders />} /> */}
      </Routes>
      <Rodape />
      
    </div>
  );
}

export default App;
