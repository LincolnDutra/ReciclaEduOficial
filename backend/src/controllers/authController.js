// backend/src/controllers/authController.js

const bcrypt = require('bcryptjs'); // Assumindo 'bcryptjs' (ou use 'bcrypt')
const jwt = require('jsonwebtoken');
const pool = require('../config/database'); 

exports.register = async (req, res) => {
    try {
        // Recebe os dados do front-end
        const { name, email, password } = req.body; 
        
        const tipo_usuario = 'aluno'; 

        // 1. Verificar se o usuário existe (Query SQL)
        const exists = await pool.query('SELECT id FROM usuarios WHERE email = $1', [email]);
        if (exists.rows.length > 0) {
             return res.status(400).json({ error: 'Email já cadastrado' });
        }
        
        // 2. Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // 3. Criar o usuário (INSERT SQL)
        // Colunas usadas: nome, email, senha, tipo_usuario (todas NOT NULL)
        const sql = `
            INSERT INTO usuarios (nome, email, senha, tipo_usuario)
            VALUES ($1, $2, $3, $4)
            RETURNING id, nome, email, tipo_usuario;
        `;
        // Valores: [name] mapeia para 'nome', [hashedPassword] mapeia para 'senha', [tipo_usuario] é o quarto valor
        const values = [name, email, hashedPassword, tipo_usuario]; 
        
        const result = await pool.query(sql, values);
        const user = result.rows[0];

        res.status(201).json({ id: user.id, email: user.email, nome: user.nome });
    } catch (err) {
        if (err.code === '23505') { 
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        console.error("Erro no registro:", err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Buscar o usuário (SELECT SQL)
        // Seleciona a senha (coluna 'senha') e o tipo de usuário (coluna 'tipo_usuario')
        const result = await pool.query('SELECT id, nome, senha, tipo_usuario FROM usuarios WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) return res.status(400).json({ error: 'Credenciais inválidas' });
        
        // 2. Comparar a senha
        // Sua coluna no DB é 'senha'
        const ok = await bcrypt.compare(password, user.senha); 
        if (!ok) return res.status(400).json({ error: 'Credenciais inválidas' });
        
        // 3. Gerar o Token
        const token = jwt.sign(
            { id: user.id, role: user.tipo_usuario }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );

        res.json({ token });
    } catch (err) {
        console.error("Erro no login:", err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};