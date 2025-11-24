import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API ReciclaEdu rodando...");
});

// Testa conexão com banco
sequelize.authenticate()
  .then(() => console.log("Conectado ao MySQL com sucesso!"))
  .catch(err => console.error("Erro ao conectar ao banco:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
