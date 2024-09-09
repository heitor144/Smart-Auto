import React, { useState } from "react";
import "./NovoFluxo.css";
import Registro from "../../../../../imgs/tela_menu/fluxo-caixa-icon.svg";

const NovoFluxo = ({ onClose, onAddRegistro }) => {
  const [NovoFluxo, setNovoFluxo] = useState({
    data: "",
    tipo: "",
    descricao: "",
    categoria: "",
    valorBruto: "",
    valorLiquido: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoFluxo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRegistro(NovoFluxo);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <header>
          <img src={Registro} />
          <h2>Adicionar Novo Registro</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <label>Data</label>
          <input
            type="date"
            name="data"
            value={NovoFluxo.data}
            onChange={handleChange}
            required
          />

          <label>Tipo</label>
          <input
            type="text"
            name="tipo"
            value={NovoFluxo.tipo}
            onChange={handleChange}
            required
          />

          <label>Descrição</label>
          <input
            type="text"
            name="descricao"
            value={NovoFluxo.descricao}
            onChange={handleChange}
            required
          />

          <label>Categoria</label>
          <input
            type="text"
            name="categoria"
            value={NovoFluxo.categoria}
            onChange={handleChange}
            required
          />

          <label>Valor Bruto</label>
          <input
            type="number"
            name="valorBruto"
            value={NovoFluxo.valorBruto}
            onChange={handleChange}
            required
          />

          <label>Valor Líquido</label>
          <input
            type="number"
            name="valorLiquido"
            value={NovoFluxo.valorLiquido}
            onChange={handleChange}
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
