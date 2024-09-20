import React, { useState, useEffect } from "react";
import axios from "axios";
import FluxoCaixa_icon from "../../../../../imgs/tela_menu/fluxo-caixa-icon.svg";

const EditarFluxoCaixa = ({ registro, onClose, onUpdateRegistro }) => {
  const formatarDataInput = (dataString) => {
    const data = new Date(dataString);
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`; // Formato YYYY-MM-DD
  };

  const [formData, setFormData] = useState({
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

  // Função para buscar as categorias
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/categorias/categorias"
        );
        setCategorias(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []); // Executa apenas uma vez ao montar o componente

  // Efeito para atualizar o formData quando o registro mudar
  useEffect(() => {
    if (registro) {
      setFormData({
        data: formatarDataInput(registro[6]), // Ajuste para o campo de data
        tipo: registro[1],
        descricao: registro[2],
        id_categoria: registro[3], // ID da categoria inicial
        valor_bruto: registro[4],
        valor_liquido: registro[5],
      });
    }
  }, [registro]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleValorChange = (e, campo) => {
    const valor = e.target.value;
    if (/^\d*([,.]?\d{0,2})?$/.test(valor)) {
      setFormData((prevState) => ({
        ...prevState,
        [campo]: valor.replace(",", "."),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRegistro = {
      ...formData,
      id_fluxo: registro[0],
      valor_bruto: parseFloat(formData.valor_bruto),
      valor_liquido: parseFloat(formData.valor_liquido),
    };

    try {
      await axios.put(
        `http://localhost:3001/api/fluxoCaixa/fluxoCaixa/atualizar`,
        updatedRegistro
      );
      onUpdateRegistro({ ...updatedRegistro, id: registro[0] });
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar o fluxo de caixa:", error);
    }
  };

  if (loading) return <p>Carregando categorias...</p>;
  if (error) return <p>Erro ao carregar categorias: {error}</p>;

  return (
    <div className="modal-background">
      <div className="modal-content-func">
        <header>
          <img src={FluxoCaixa_icon} alt="Fluxo Caixa" />
          <h2>Editar Registro de Fluxo de Caixa</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <label>Data:</label>
          <input
            type="date"
            name="data"
            value={formData.data}
            onChange={handleChange}
            required
          />

          <label>Tipo:</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecione um tipo...
            </option>
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
          </select>

          <label>Descrição:</label>
          <input
            type="text"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Digite uma descrição..."
            required
          />

          <label>Categoria:</label>
          <select
            name="id_categoria"
            value={formData.id_categoria}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecione uma categoria...
            </option>
            {categorias.map((categoria) => (
              <option
                key={categoria[0]} // Certifique-se de que este é o ID correto
                value={categoria[0]}
              >
                {categoria[1]}
              </option>
            ))}
          </select>

          <label>Valor Bruto:</label>
          <input
            type="text"
            name="valor_bruto"
            value={formData.valor_bruto}
            onChange={(e) => handleValorChange(e, "valor_bruto")}
            placeholder="Digite o valor bruto..."
            required
          />

          <label>Valor Líquido:</label>
          <input
            type="text"
            name="valor_liquido"
            value={formData.valor_liquido}
            onChange={(e) => handleValorChange(e, "valor_liquido")}
            placeholder="Digite o valor líquido..."
            required
          />

          <div className="botao-adicionar">
            <button type="submit">Salvar</button>
          </div>
        </form>
        <div className="botao-fechar">
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarFluxoCaixa;
