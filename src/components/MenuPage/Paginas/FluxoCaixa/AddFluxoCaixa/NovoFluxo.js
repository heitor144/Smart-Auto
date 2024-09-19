import React, { useState, useEffect } from "react";
import "./NovoFluxo.css";
import axios from "axios";
import Registro from "../../../../../imgs/tela_menu/fluxo-caixa-icon.svg";

const NovoFluxo = ({ onClose, onAddRegistro }) => {
  const [novoFluxo, setNovoFluxo] = useState({
    data: "",
    tipo: "",
    descricao: "",
    id_categoria: "",
    valor_bruto: "",
    valor_liquido: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const resetForm = () => {
    setNovoFluxo({
      data: "",
      tipo: "",
      descricao: "",
      id_categoria: "",
      valor_bruto: "",
      valor_liquido: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoFluxo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTipoChange = (e) => {
    setNovoFluxo((prevState) => ({
      ...prevState,
      tipo: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/categorias/categorias");
        setCategorias(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  const handleValorChange = (e, campo) => {
    const valor = e.target.value;
    // Permite apenas números e uma vírgula ou ponto
    if (/^\d*([,.]?\d{0,2})?$/.test(valor)) {
      setNovoFluxo((prevState) => ({
        ...prevState,
        [campo]: valor.replace(",", "."), // Troca vírgula por ponto
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoRegistro = {
      ...novoFluxo,
      valor_bruto: parseFloat(novoFluxo.valor_bruto), // Converte para número
      valor_liquido: parseFloat(novoFluxo.valor_liquido), // Converte para número
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/fluxoCaixa/fluxoCaixa",
        novoRegistro
      );

      if (response.status === 201) {
        onAddRegistro(response.data);
        resetForm();
        onClose();
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição", error);
      resetForm();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <header>
          <img src={Registro} alt="Registro" />
          <h2>Adicionar Novo Registro</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <label>Data</label>
          <input
            type="date"
            name="data"
            value={novoFluxo.data}
            onChange={handleChange}
            required
          />
          <label>Tipo</label>
          <select
            name="tipo"
            value={novoFluxo.tipo}
            onChange={handleTipoChange}
            required
          >
            <option value="" disabled>
              Selecione um tipo...
            </option>
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
          </select>
          <label>Descrição</label>
          <input
            type="text"
            name="descricao"
            value={novoFluxo.descricao}
            onChange={handleChange}
            placeholder="Digite a descrição..."
            required
          />
          <label>Categoria</label>
          <select
            name="id_categoria"
            value={novoFluxo.id_categoria}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecione uma categoria...
            </option>
            {categorias.map((categoria) => (
              <option key={categoria[0]} value={categoria[0]}>
                {categoria[1]}
              </option>
            ))}
          </select>
          <label>Valor Bruto</label>
          <input
            type="text"
            name="valor_bruto"
            value={novoFluxo.valor_bruto}
            onChange={(e) => handleValorChange(e, "valor_bruto")} // Chamada da nova função
            placeholder="Digite o valor bruto..."
            required
          />
          <label>Valor Líquido</label>
          <input
            type="text"
            name="valor_liquido"
            value={novoFluxo.valor_liquido}
            onChange={(e) => handleValorChange(e, "valor_liquido")} // Chamada da nova função
            placeholder="Digite o valor líquido..."
            required
          />
          <div className="botao-adicionar">
            <button type="submit">Adicionar</button>
          </div>
        </form>
        <div className="botao-fechar">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default NovoFluxo;
