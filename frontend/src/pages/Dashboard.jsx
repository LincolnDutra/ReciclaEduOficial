import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:3000/usuarios", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsuarios(response.data);
    }

    load();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>
      <h3>Usuários do sistema</h3>

      <table border="1" width="100%" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Pontos</th>
            <th>Nível</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>{u.pontos}</td>
              <td>{u.nivel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
