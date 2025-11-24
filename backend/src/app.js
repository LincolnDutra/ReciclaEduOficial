// backend/src/app.js

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const gamificationRoutes = require('./routes/gamification');
const app = express();

// 💡 CONFIGURAÇÃO CORS EXPLÍCITA
const corsOptions = {
    // Permite apenas o acesso da porta onde o React está rodando
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Permite todos os métodos necessários
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); // Aplica a configuração explícita
app.use(express.json()); // Middleware para JSON (body parser)

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/game', gamificationRoutes); 

app.get('/', (req, res) => res.json({ ok: true, project: 'ReciclaEdu' }));

module.exports = app;
