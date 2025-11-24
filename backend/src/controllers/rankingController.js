// backend/src/controllers/rankingController.js
const pool = require('../config/database'); 

exports.getRanking = async (req, res) => {
    try {
        // SQL: Consulta a VIEW 'ranking' que já tem a ordem e a posição
        const sql = 'SELECT * FROM ranking ORDER BY posicao ASC;'; 
        const result = await pool.query(sql);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Erro ao buscar ranking:", error);
        res.status(500).json({ message: "Erro interno ao buscar ranking." });
    }
};