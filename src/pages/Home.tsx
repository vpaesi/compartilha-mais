import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { type Doacao, listarDoacoes } from "../services/storage";
import helpingEachOther from "../assets/helping_each_other.svg";
import sharingArticles from "../assets/sharing_articles.svg";

export default function Home() {
  const usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado") || "null"
  );
  const [ultimasDoacoes, setUltimasDoacoes] = useState<Doacao[]>([]);

  useEffect(() => {
    const todas = listarDoacoes()
      .filter((d) => d.status === "disponivel")
      .sort(
        (a, b) =>
          new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
      );

    setUltimasDoacoes(todas.slice(0, 3));
  }, []);

  return (
    <div className="max-w-2xl md:max-w-3xl mx-auto p-6 font-sans">
      <section className="text-center mb-12 bg-gray-100 p-8 rounded-xl">
        <img
          src={helpingEachOther}
          alt="Compartilhando"
          className="max-w-[160px] w-full h-auto mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold mb-2 text-gray-800 flex items-center justify-center gap-2">
          <span>🌟</span> Compartilha+
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Conectando pessoas para compartilhar o que realmente importa.
        </p>
        {!usuarioLogado ? (
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
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
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <Link
              to="/publicas"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors"
            >
              Ver Doações
            </Link>
            <Link
              to="/minhas-doacoes"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg shadow transition-colors"
            >
              Ver Minhas Doações
            </Link>
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">📦 Últimas Doações disponíveis</h2>
        {ultimasDoacoes.length === 0 ? (
          <p className="text-gray-500">Nenhuma doação disponível no momento.</p>
        ) : (
          <ul className="list-none p-0 mb-4">
            {ultimasDoacoes.map((d) => (
              <li
                key={d.id}
                className="flex gap-4 p-4 border border-gray-200 rounded-lg mb-3 items-center bg-white shadow-sm"
              >
                {d.imagem && (
                  <img
                    src={d.imagem}
                    alt={d.nome}
                    className="w-20 h-20 object-cover rounded-lg max-w-[80px] max-h-[80px]"
                  />
                )}
                <div>
                  <h4 className="font-bold text-lg text-gray-800">{d.nome}</h4>
                  <p className="text-gray-600 mb-1">{d.descricao}</p>
                  <small className="text-gray-400">Categoria: {d.categoria}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Link to="/doacoes" className="text-blue-600 hover:underline font-medium">
          Ver todas as doações →
        </Link>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">🎯 Como funciona?</h2>
        <img
          src={sharingArticles}
          alt="Como funciona"
          className="w-full max-w-[300px] h-auto mx-auto mb-4"
        />
        <ul className="list-disc list-inside text-left max-w-md mx-auto text-gray-700 space-y-1">
          <li>✅ Cadastre-se gratuitamente</li>
          <li>📦 Doe itens que não usa mais</li>
          <li>🙋‍♀️ Solicite itens disponíveis</li>
          <li>💬 Converse com quem está doando</li>
          <li>🚪 Combine a entrega com segurança</li>
        </ul>
      </section>

      <footer className="mt-12 text-center text-sm text-gray-400">
        <p>🌍 Projeto de Extensão | ADS - 2025</p>
      </footer>
    </div>
  );
}
