import React, { useState } from "react";
import api from "../api/api";
import CadastrarButton from "../components/CadastrarButton"; // Importa o botão

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Erro ao logar");
    }
  };

  const handleCadastrar = () => {
    // Aqui você decide o que o botão faz:
    // Exemplo 1: redirecionar para uma página de cadastro
    window.location.href = "/cadastro";

    // Exemplo 2: apenas mostrar um alerta
    // alert("Abrir tela de cadastro");
  };

  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 20 }}>ReciclaEdu</h1>

      <input
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          marginBottom: 10,
          padding: 10,
          width: "250px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <input
        placeholder="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          marginBottom: 15,
          padding: 10,
          width: "250px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={login}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Entrar
      </button>

      {/* Botão de cadastrar abaixo */}
      <CadastrarButton onClick={handleCadastrar} />
    </div>
  );
}
