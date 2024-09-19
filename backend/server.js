const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const servicoRoutes = require('./routes/servicoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const cargoRoutes = require('./routes/cargoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes'); // Importando as rotas de usuário
const fluxoCaixaRoutes = require('./routes/fluxoCaixaRoutes'); // Importando as rotas de usuário
const categoriaRoutes = require('./routes/categoriaRoutes'); // Importando as rotas de usuário



const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Habilita CORS para todas as requisições
app.use(cors());

// Rotas
app.use('/api/funcionarios', funcionarioRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/cargos', cargoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/fluxoCaixa', fluxoCaixaRoutes);
app.use('/api/categorias', categoriaRoutes);

// Iniciar o servidor e conectar ao banco de dados
db.initialize().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Erro ao inicializar o banco de dados:', err);
});
