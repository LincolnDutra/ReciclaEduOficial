// backend/routes/index.js

require('dotenv').config();
const app = require('./app');
const pool = require('./config/database'); // 💡 ALTERADO: Importar o pool 'pg'
const PORT = process.env.PORT || 4000;

(async () => {
  try {
    // A função pool.connect tenta estabelecer a conexão
    await pool.connect() 
    console.log('✅ Conectado ao Postgres');
        
    app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
  } catch (err) {
    console.error('❌ Erro ao iniciar servidor ou conectar ao DB:', err);
    process.exit(1);
  }
})();