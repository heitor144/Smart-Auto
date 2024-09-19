const usuarioModel = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    const { login, senha } = req.body;

    try {
        const usuarioValido = await usuarioModel.verificarLogin(login, senha);

        if (usuarioValido) {
            const token = jwt.sign({ login }, '987456321', { expiresIn: '1h' });
            return res.json({ token });
        } else {
            return res.status(401).send('Credenciais inválidas');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).send('Erro ao fazer login');
    }
}

module.exports = { login };
