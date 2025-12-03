import React, { useEffect, useState } from "react";
import api from "../../api/api";
import Sidebar from "./Sidebar";
import "../../styles/global.css";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [ranking, setRanking] = useState([]);
  const [prizes, setPrizes] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const usersResp = await api.get("/users");
      setRanking(usersResp.data);

      const me = usersResp.data.find(u => u.id);
      setUser(me || []);

      // Premiações fictícias - você pode substituir pela API
      setPrizes([
        { name: "Medalha Bronze", needed: 100 },
        { name: "Medalha Prata", needed: 200 },
        { name: "Medalha Ouro", needed: 300 },
      ]);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar user={user} />

      <div className="content">
        
        <div className="table-container">
          <h3>Ranking de Pontuação</h3>
          <table>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Pontos</th>
              </tr>
            </thead>
            <tbody>
              {ranking.sort((a,b) => b.points - a.points).map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-container">
          <h3>Premiações</h3>
          <table>
            <thead>
              <tr>
                <th>Premiação</th>
                <th>Pontos necessários</th>
              </tr>
            </thead>
            <tbody>
              {prizes.map((p, index) => (
                <tr key={index}>
                  <td>{p.name}</td>
                  <td>{p.needed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
