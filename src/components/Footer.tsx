import { Link } from "react-router-dom";

export default function Footer() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
  return (
    <footer style={estilos.footer}>
      <div style={estilos.linhaSuperior}>
        <h3 style={estilos.logo}>Compartilha+</h3>
        <div style={estilos.links}>
          <Link to="/" style={estilos.link}>
            Início
          </Link>
          <Link to="/publicas" style={estilos.link}>
            Doações
          </Link>
          {usuario && (
            <>
              <Link to="/minhas-doacoes" style={estilos.link}>
                Ver Minhas Doações
              </Link>
              <Link to="/chats" style={estilos.link}>
                Chats
              </Link>
            </>
          )}
        </div>
      </div>

      <div style={estilos.linhaInferior}>
        <p style={estilos.credito}>
          💡 Projeto de Extensão III | ADS - 2025/02
        </p>
        <p style={estilos.autora}>Feito com 💙 por Vitória Paesi</p>
        <p>versão beta 1.0.0 - 2025</p>
      </div>
    </footer>
  );
}

const estilos = {
  footer: {
    backgroundColor: "#1f2937",
    color: "#f9fafb",
    padding: "2rem 1rem",
    marginTop: "4rem",
    fontFamily: "sans-serif",
  },
  linhaSuperior: {
    display: "flex",
    flexWrap: "wrap" as const,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
    gap: "1rem",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#60a5fa",
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap" as const,
  },
  link: {
    color: "#f9fafb",
    textDecoration: "none",
    fontSize: "0.95rem",
  },
  linhaInferior: {
    borderTop: "1px solid #374151",
    paddingTop: "1rem",
    fontSize: "0.85rem",
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.25rem",
    textAlign: "center" as const,
  },
  credito: {
    margin: 0,
  },
  autora: {
    margin: 0,
    fontStyle: "italic",
    color: "#d1d5db",
  },
};
