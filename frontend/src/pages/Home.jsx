import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1>Bem-vindo ao ReciclaEdu</h1>
        <p>
          Um sistema gamificado de educação ambiental com ranking, conquistas e recompensas!
        </p>

        <div style={styles.buttons}>
          <Link to="/login" style={styles.btn}>Entrar</Link>
          <Link to="/register" style={styles.btn2}>Criar Conta</Link>
        </div>

        {/* Caixa branca com título — você pode remover se quiser */}
        <div style={styles.loginBox}>
          <h2 style={{ color: "var(--primary-dark)" }}>Login</h2>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    textAlign: "center",
    paddingTop: "80px"
  },
  buttons: {
    marginTop: "30px",
  },
  btn: {
    background: "#2d6a4f",
    padding: "12px 25px",
    borderRadius: "8px",
    color: "#fff",
    textDecoration: "none",
    marginRight: "20px",
  },
  btn2: {
    background: "#40916c",
    padding: "12px 25px",
    borderRadius: "8px",
    color: "#fff",
    textDecoration: "none"
  },
  loginBox: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    width: "350px",
    margin: "60px auto",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.15)"
  }
};
