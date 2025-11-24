import React from "react";

function CadastrarButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "16px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
      }}
    >
      Cadastrar
    </button>
  );
}

export default CadastrarButton;

