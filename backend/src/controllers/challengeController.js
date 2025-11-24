// backend/src/controllers/challengeController.js
const pool = require('../config/database');

exports.completeChallenge = async (req, res) => {
    // Idealmente, você verificaria se o desafio existe e se o usuário tem permissão
    const { usuario_id, desafio_id, pontos_ganhos } = req.body; 

    try {
        // SQL: Insere na tabela 'desafios_concluidos'. O TRIGGER em 'reciclaedu' atualiza os pontos!
        const sql = `
            INSERT INTO desafios_concluidos (usuario_id, desafio_id, pontos_ganhos)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        await pool.query(sql, [usuario_id, desafio_id, pontos_ganhos]);

        // Busca o novo total de pontos e nível.
        const userResult = await pool.query('SELECT pontos, nivel FROM usuarios WHERE id = $1', [usuario_id]);
        
        res.status(201).json({ 
            message: "Desafio concluído! Pontos creditados automaticamente pelo sistema SQL.",
            pontos: userResult.rows[0].pontos,
            nivel: userResult.rows[0].nivel
        });

    } catch (error) {
        console.error("Erro ao registrar conclusão:", error);
        res.status(500).json({ message: "Erro interno ao concluir desafio." });
    }
};