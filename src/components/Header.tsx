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
    <header className="bg-gray-100 py-4 px-4 mb-8 shadow-sm">
      <nav className="flex gap-4 items-center">
        {(!usuario && isHome) ? (
          <>
            <Link to="/publicas" className="text-blue-700 font-medium hover:underline">Doações disponíveis</Link>
            <span className="ml-auto flex gap-2">
              {!isLogin && <Link to="/login" className="text-blue-700 hover:underline">Login</Link>}
              {!isLogin && !isCadastro && <span>|</span>}
              {!isCadastro && <Link to="/cadastro" className="text-blue-700 hover:underline">Cadastro</Link>}
            </span>
          </>
        ) : usuario ? (
          <>
            {/* Menu hambúrguer para usuário logado */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen((open) => !open)}
                className="bg-transparent border-none text-2xl cursor-pointer p-0 mr-4"
                aria-label="Abrir menu"
              >
                &#9776;
              </button>
              {menuOpen && (
                <div
                  className="absolute top-10 left-0 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-[180px] flex flex-col"
                >
                  <Link to="/" className="px-4 py-3 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Início</Link>
                  <Link to="/nova-doacao" className="px-4 py-3 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Cadastrar Doação</Link>
                  <Link to="/minhas-doacoes" className="px-4 py-3 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Ver Minhas Doações</Link>
                  <Link to="/publicas" className="px-4 py-3 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Doações disponíveis</Link>
                  <Link to="/recebidas" className="px-4 py-3 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Doações recebidas</Link>
                  <Link to="/perfil" className="px-4 py-3 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Meu Perfil</Link>
                  <Link to="/chats" className="px-4 py-3 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Chats</Link>
                </div>
              )}
            </div>
            <span className="ml-auto text-gray-700 font-medium">Bem-vindo(a), {usuario.nome}</span>
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="text-blue-700 font-medium hover:underline">Início</Link>
            <Link to="/publicas" className="text-blue-700 font-medium hover:underline">Doações disponíveis</Link>
            <span className="ml-auto flex gap-2">
              {!isLogin && <Link to="/login" className="text-blue-700 hover:underline">Login</Link>}
              {!isLogin && !isCadastro && <span>|</span>}
              {!isCadastro && <Link to="/cadastro" className="text-blue-700 hover:underline">Cadastro</Link>}
            </span>
          </>
        )}
      </nav>
    </header>
  );
}
