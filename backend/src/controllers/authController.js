import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

// REGISTRO DE USUÁRIO
export const register = async (req, res) => {
  try {
    const { nome, email, password, tipo_usuario } = req.body;

    // Verifica se o email já existe
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ error: "Email já cadastrado" });

    // Criptografa a senha
    const hash = await bcrypt.hash(password, 10);

    // Cria o usuário
    const novoUsuario = await Usuario.create({
      nome,
      email,
      password: hash, // campo agora existe no banco
      tipo_usuario,
    });

    return res.status(201).json({ message: "Cadastro realizado com sucesso" });
  } catch (err) {
    console.error("🔥 ERRO NO REGISTER:", err);
    res.status(500).json({ error: err.message });
  }
};

// LOGIN DE USUÁRIO
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Encontra o usuário
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verifica a senha
    const senhaCorreta = await bcrypt.compare(password, usuario.password);
    if (!senhaCorreta) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    // Gera token JWT
    const token = jwt.sign(
      { id: usuario.id, tipo_usuario: usuario.tipo_usuario },
      "secreta123",
      { expiresIn: "1d" }
    );

    res.json({ token, usuario });
  } catch (err) {
    console.error("🔥 ERRO NO LOGIN:", err);
    res.status(500).json({ error: err.message });
  }
};
