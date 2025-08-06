import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    alert("Você saiu do sistema.");
    navigate("/login");
  };

  return (
    <header style={{ background: "#eee", padding: "1rem", marginBottom: "2rem" }}>
      <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link to="/">Início</Link>
        <Link to="/nova-doacao">Nova Doação</Link>
        <Link to="/minhas-doacoes">Minhas Doações</Link>
        <Link to="/publicas">Doações Públicas</Link>
        <Link to="/recebidas">Recebidas</Link>
        <Link to="/perfil">Perfil</Link>
        <Link to="/chats">Chats</Link>

        {usuario ? (
          <>
            <span style={{ marginLeft: "auto" }}>Bem-vindo(a), {usuario.nome}</span>
            <button onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <span style={{ marginLeft: "auto" }}>
            <Link to="/login">Login</Link> | <Link to="/cadastro">Cadastro</Link>
          </span>
        )}
      </nav>
    </header>
  );
}
