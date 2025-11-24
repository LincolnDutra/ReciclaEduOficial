export default function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "var(--primary-dark)",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h1
        style={{
          color: "var(--primary-light)",
          fontWeight: "bold",
          fontSize: "28px"
        }}
      >
        Recicla
        <span style={{ color: "var(--primary-medium)" }}>Edu</span>
      </h1>
    </nav>
  );
}
