import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users"); // token injetado pelo interceptor
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Ranking</h2>
      <ol>
        {users.sort((a,b) => (b.points || 0) - (a.points || 0)).map(u => (
          <li key={u.id}>{u.name} — {u.points || 0} pts</li>
        ))}
      </ol>
    </div>
  );
}
