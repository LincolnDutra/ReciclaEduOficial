import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        senha
      });

      localStorage.setItem("token", response.data.token);
      window.location.href = "/dashboard";

    } catch (error) {
      alert("Credenciais inválidas!");
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.box}>
        <h2 style={{ color: "var(--primary-dark)" }}>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={styles.input}
        />

        <button style={styles.btn} onClick={handleLogin}>Entrar</button>
      </div>
    </>
  );
}

const styles = {
  box: {
    width: "350px",
    margin: "60px auto",
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.15)",
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
    background: "var(--primary-dark)",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  }
};
