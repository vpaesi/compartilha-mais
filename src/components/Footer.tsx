import { Link } from "react-router-dom";

export default function Footer() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
  return (
    <footer className="bg-gray-900 text-gray-100 py-8 px-4 mt-16 font-sans">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <Link to="/" className="text-2xl font-bold text-blue-400 m-0 hover:underline">
          Compartilha+
        </Link>
        <div className="flex gap-4 flex-wrap">
          <Link
            to="/"
            className="text-gray-100 hover:text-blue-300 text-base transition-colors"
          >
            Início
          </Link>
          <Link
            to="/publicas"
            className="text-gray-100 hover:text-blue-300 text-base transition-colors"
          >
            Doações
          </Link>
          {usuario && (
            <>
              <Link
                to="/minhas-doacoes"
                className="text-gray-100 hover:text-blue-300 text-base transition-colors"
              >
                Ver Minhas Doações
              </Link>
              <Link
                to="/chats"
                className="text-gray-100 hover:text-blue-300 text-base transition-colors"
              >
                Chats
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4 text-sm flex flex-col gap-1 text-center">
        <p className="m-0">Projeto de Extensão | 2025/02</p>
        <p className="m-0 italic text-gray-300">
          Desenvolvido por{" "}
          <a href="https://github.com/JoaoPeregrina">João Pedro Peregrina</a> e{" "}
          <a href="https://github.com/vpaesi">Vitória Peregrina</a>
        </p>
        <p className="m-0">versão beta 1.0.0 - 2025</p>
      </div>
    </footer>
  );
}
