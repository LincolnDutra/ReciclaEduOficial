import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import sequelize from "./config/database.js";

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao MySQL");
    await sequelize.sync(); // em produção reveja { alter: true } ou migrações adequadas
    app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
  } catch (err) {
    console.error("Erro ao iniciar servidor:", err);
    process.exit(1);
  }
})();
