import React from "react";

export default function Sidebar({ user }) {
  return (
    <div className="sidebar">
      <h2>ReciclaEdu</h2>

      <div className="info">
        <p><strong>{user.name}</strong></p>
        <p>{user.email}</p>
        <p>Curso: {user.course || "Não informado"}</p>
        <p>Instituição: {user.institution || "Não informado"}</p>
        <p>Pontuação: {user.points}</p>
      </div>

      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}>
        Sair
      </button>
    </div>
  );
}
