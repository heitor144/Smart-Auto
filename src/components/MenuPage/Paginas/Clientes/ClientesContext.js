import React, { createContext, useState } from 'react';

// Cria o contexto
export const ClientesContext = createContext();

// Cria o provedor do contexto
export const ClientesProvider = ({ children }) => {
    const [clientes, setClientes] = useState([
        { id: 1, nome: 'Mark Otto', telefone: 'xxxxxxxxxx', cpf: '999999999-99' },
        { id: 2, nome: 'Jacob', telefone: 'yyyyyyyyyy', cpf: '999999999-99' },
        { id: 3, nome: 'Larry the bird', telefone: 'zzzzzzzzzz', cpf: '999999999-99' }
    ]);

    return (
        <ClientesContext.Provider value={{ clientes, setClientes }}>
            {children}
        </ClientesContext.Provider>
    );
};
