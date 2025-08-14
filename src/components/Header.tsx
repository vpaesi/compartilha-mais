import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    alert("Você saiu do sistema.");
    navigate("/login");
  };

  const isHome = location.pathname === "/";

  const isLogin = location.pathname === "/login";
  const isCadastro = location.pathname === "/cadastro";

  return (
    <header
      style={{ background: "#eee", padding: "1rem", marginBottom: "2rem" }}
    >
      <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {(!usuario && isHome) ? (
          <>
            <Link to="/publicas">Doações disponíveis</Link>
            <span style={{ marginLeft: "auto" }}>
              {!isLogin && <Link to="/login">Login</Link>}
              {!isLogin && !isCadastro && " | "}
              {!isCadastro && <Link to="/cadastro">Cadastro</Link>}
            </span>
          </>
        ) : usuario ? (
          <>
            {/* Menu hambúrguer para usuário logado */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setMenuOpen((open) => !open)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "2rem",
                  cursor: "pointer",
                  padding: 0,
                  marginRight: "1rem"
                }}
                aria-label="Abrir menu"
              >
                &#9776;
              </button>
              {menuOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "2.5rem",
                    left: 0,
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    zIndex: 10,
                    minWidth: "180px",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Link to="/" style={{ padding: "0.75rem 1rem" }} onClick={() => setMenuOpen(false)}>Início</Link>
                  <Link to="/nova-doacao" style={{ padding: "0.75rem 1rem" }} onClick={() => setMenuOpen(false)}>Cadastrar Doação</Link>
                  <Link to="/minhas-doacoes" style={{ padding: "0.75rem 1rem" }} onClick={() => setMenuOpen(false)}>Ver Minhas Doações</Link>
                  <Link to="/publicas" style={{ padding: "0.75rem 1rem" }} onClick={() => setMenuOpen(false)}>Doações disponíveis</Link>
                  <Link to="/recebidas" style={{ padding: "0.75rem 1rem" }} onClick={() => setMenuOpen(false)}>Doações recebidas</Link>
                  <Link to="/perfil" style={{ padding: "0.75rem 1rem" }} onClick={() => setMenuOpen(false)}>Meu Perfil</Link>
                  <Link to="/chats" style={{ padding: "0.75rem 1rem" }} onClick={() => setMenuOpen(false)}>Chats</Link>
                </div>
              )}
            </div>
            <span style={{ marginLeft: "auto" }}>
              Bem-vindo(a), {usuario.nome}
            </span>
            <button onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/">Início</Link>
            <Link to="/publicas">Doações disponíveis</Link>
            <span style={{ marginLeft: "auto" }}>
              {!isLogin && <Link to="/login">Login</Link>}
              {!isLogin && !isCadastro && " | "}
              {!isCadastro && <Link to="/cadastro">Cadastro</Link>}
            </span>
          </>
        )}
      </nav>
    </header>
  );
}
