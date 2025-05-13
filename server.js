const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = 'chaveSimples123';

// Login didático
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '123456') {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Credenciais inválidas' });
});

// Rota protegida
app.get('/dados', authMiddleware, (req, res) => {
  res.json({ message: 'Dados protegidos acessados com sucesso!' });
});

app.listen(4000, () => console.log('Servidor rodando na porta 4000'));
