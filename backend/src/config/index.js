// backend/src/config/database.js (ou config/index.js)

// 1. Carrega as variáveis do .env (se já não estiver sendo feito em app.js ou index.js)
require('dotenv').config(); 

const { Pool } = require('pg');

// 2. Cria o objeto de conexão usando as variáveis do .env
const pool = new Pool({
    user: process.env.DB_USER,        
    host: process.env.DB_HOST,        
    database: process.env.DB_NAME,    // reciclaedu
    password: process.env.DB_PASSWORD, 
    port: process.env.DB_PORT,        // 5432
});

// Opcional: Testar a conexão
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro ao adquirir cliente do pool', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Erro na query de teste', err.stack);
        }
        console.log('Conexão com PostgreSQL estabelecida com sucesso!');
    });
});

module.exports = pool; // Exporta para ser usado nos controllers