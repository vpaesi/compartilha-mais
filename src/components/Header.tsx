
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";


export default function Header() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (!window.confirm("Tem certeza que deseja sair da sua conta?")) return;
    localStorage.removeItem("usuarioLogado");
    alert("Você saiu do sistema.");
    navigate("/login");
    setMenuOpen(false);
  };

  const isLogin = location.pathname === "/login";
  const isCadastro = location.pathname === "/cadastro";

  return (
    <header className="bg-gray-100 py-4 px-4 md:px-12 mb-8 shadow-sm">
      <nav className="flex items-center gap-4 relative">
        {/* Nome da aplicação sempre visível e clicável para home */}
        <Link to="/" className="text-2xl font-bold text-blue-700 hover:underline mr-6">Compartilha+</Link>

        {/* Menu desktop */}
        <div className="hidden md:flex gap-4 flex-1 items-center">
          {usuario ? (
            <>
              <Link to="/" className="text-blue-700 font-medium hover:underline">Início</Link>
              <Link to="/nova-doacao" className="text-blue-700 font-medium hover:underline">Doar</Link>
              <Link to="/publicas" className="text-blue-700 font-medium hover:underline">Doações</Link>
              <Link to="/minhas-doacoes" className="text-blue-700 font-medium hover:underline">Ver Minhas Doações</Link>
              <Link to="/chats" className="text-blue-700 font-medium hover:underline">Chats</Link>
              <span className="ml-auto flex items-center gap-4">
                Bem-vindo(a),{" "}
                <Link
                  to="/perfil"
                  className="text-blue-700 font-medium hover:underline relative group"
                >
                  {usuario.nome}
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-max bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    Ver Perfil
                  </span>
                </Link>  <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                >
                  Sair
                </button>
              </span>
            </>
          ) : (
            <>
              <Link to="/publicas" className="text-blue-700 font-medium hover:underline">Doações disponíveis</Link>
              <span className="ml-auto flex gap-2">
                {!isLogin && <Link to="/login" className="text-blue-700 hover:underline">Login</Link>}
                {!isLogin && !isCadastro && <span>|</span>}
                {!isCadastro && <Link to="/cadastro" className="text-blue-700 hover:underline">Cadastro</Link>}
              </span>
            </>
          )}
        </div>

        {/* Menu hambúrguer mobile */}
        <div className="md:hidden ml-auto flex items-center">
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="bg-transparent border-none text-2xl cursor-pointer p-2"
            aria-label="Abrir menu"
          >
            <span>&#9776;</span>
          </button>
          {menuOpen && (
            <div className="absolute top-16 right-4 bg-white border border-gray-300 rounded shadow-lg z-20 min-w-[200px] flex flex-col animate-fade-in">
              {usuario ? (
                <>
                  <Link to="/" className="px-4 py-3 hover:bg-gray-100 border-b" onClick={() => setMenuOpen(false)}>Início</Link>
                  <Link to="/perfil" className="px-4 py-3 hover:bg-gray-100 border-b" onClick={() => setMenuOpen(false)}>Perfil</Link>
                  <Link to="/nova-doacao" className="px-4 py-3 hover:bg-gray-100 border-b" onClick={() => setMenuOpen(false)}>Nova Doação</Link>
                  <Link to="/publicas" className="px-4 py-3 hover:bg-gray-100 border-b" onClick={() => setMenuOpen(false)}>Doações</Link>
                  <Link to="/minhas-doacoes" className="px-4 py-3 hover:bg-gray-100 border-b" onClick={() => setMenuOpen(false)}>Ver Minhas Doações</Link>
                  <Link to="/chats" className="px-4 py-3 hover:bg-gray-100 border-b" onClick={() => setMenuOpen(false)}>Chats</Link>
                  <button
                    onClick={handleLogout}
                    className="m-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link to="/publicas" className="px-4 py-3 hover:bg-gray-100 border-b" onClick={() => setMenuOpen(false)}>Doações disponíveis</Link>
                  {!isLogin && <Link to="/login" className="px-4 py-3 hover:bg-gray-100 border-b" onClick={() => setMenuOpen(false)}>Login</Link>}
                  {!isCadastro && <Link to="/cadastro" className="px-4 py-3 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Cadastro</Link>}
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
