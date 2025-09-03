import { Link } from "react-router-dom";
import charity from "../assets/charity-pana.svg"

export default function HeroSection() {
  const usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado") || "null"
  );

  return (
    <section className="text-center mb-12 bg-gray-100 p-8 rounded-xl">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-2 text-gray-800 flex items-center justify-center md:justify-start gap-2">
        <span>Compartilha+</span>
        </h1>
        <p className="text-lg text-gray-600 mb-4 md:text-left">
        Conectando pessoas para compartilhar o que realmente importa.
        </p>
        {!usuarioLogado ? (
        <div className="mt-6 flex justify-center md:justify-start gap-4 flex-wrap">
          <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors"
          >
          Entrar
          </Link>
          <Link
          to="/cadastro"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg shadow transition-colors"
          >
          Criar conta
          </Link>
        </div>
        ) : (
        <div className="mt-6 flex justify-center md:justify-start gap-4 flex-wrap">
          <Link
          to="/nova-doacao"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg shadow transition-colors"
          >
          Doar
          </Link>
          <Link
          to="/publicas"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors"
          >
          Ver Doações
          </Link>
        </div>
        )}
      </div>
      <div className="flex-1 flex justify-center">
        <img
        src={charity}
        alt="Compartilhando"
        className="w-full h-auto"
        />
      </div>
      </div>
    </section>
  );
}
