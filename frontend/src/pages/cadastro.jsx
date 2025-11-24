import React, { useState } from "react";
import api from "../api/api";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async () => {
    try {
      const res = await api.post("/auth/register", {
        nome,
        email,
        password: senha,
      });
      alert("Cadastro realizado com sucesso!");
      window.location.href = "/"; // volta pra tela de login
    } catch (err) {
      alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
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
      <h1 style={{ marginBottom: 20 }}>Cadastrar Novo Usuário</h1>

      <input
        placeholder="Nome completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{
          marginBottom: 10,
          padding: 10,
          width: "250px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <input
        placeholder="E-mail"
        type="email"
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
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{
          marginBottom: 15,
          padding: 10,
          width: "250px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleCadastro}
        style={{
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Cadastrar
      </button>

      <button
        onClick={() => (window.location.href = "/")}
        style={{
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Voltar ao Login
      </button>
    </div>
  );
}
