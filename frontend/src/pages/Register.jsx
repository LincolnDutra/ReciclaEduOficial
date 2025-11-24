import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Register() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3001/api/auth/register", form);
      alert("Cadastro realizado com sucesso!");
      window.location.href = "/login";
    } catch (err) {
      alert("Erro ao cadastrar.");
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.box}>
        <h2>Cadastro</h2>

        <input
          name="nome"
          placeholder="Nome"
          style={styles.input}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          style={styles.input}
          onChange={handleChange}
        />

        <input
          name="senha"
          type="password"
          placeholder="Senha"
          style={styles.input}
          onChange={handleChange}
        />

        <button style={styles.btn} onClick={handleSubmit}>
          Criar Conta
        </button>
      </div>
    </>
  );
}

const styles = {
  box: {
    width: "350px",
    margin: "60px auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "15px",
    borderRadius: "6px",
    border: "1px solid gray",
  },
  btn: {
    marginTop: "20px",
    width: "100%",
    padding: "10px",
    background: "#40916c",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  }
};
