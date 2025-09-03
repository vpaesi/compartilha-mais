import sharingArticles from "../assets/sharing_articles.svg";

export default function HowItWorksSection() {
  return (
    <section>
      <h2 className="text-4xl text-center font-semibold mb-8">
      Como funciona?
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
      <img
        src={sharingArticles}
        alt="Como funciona"
        className="w-full max-w-[300px] h-auto mb-4 md:mb-0"
      />
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
        <li className="bg-white rounded-xl shadow p-4 flex items-center gap-3 border border-gray-100 transition-transform duration-200 hover:scale-110">
          <span className="text-xl">✅</span>
          <span className="text-gray-700 font-medium">
        Cadastre-se gratuitamente
          </span>
        </li>
        <li className="bg-white rounded-xl shadow p-4 flex items-center gap-3 border border-gray-100 transition-transform duration-200 hover:scale-110">
          <span className="text-xl">📦</span>
          <span className="text-gray-700 font-medium">
        Doe itens que não usa mais
          </span>
        </li>
        <li className="bg-white rounded-xl shadow p-4 flex items-center gap-3 border border-gray-100 transition-transform duration-200 hover:scale-110">
          <span className="text-xl">🙋‍♀️</span>
          <span className="text-gray-700 font-medium">
        Solicite itens disponíveis
          </span>
        </li>
        <li className="bg-white rounded-xl shadow p-4 flex items-center gap-3 border border-gray-100 transition-transform duration-200 hover:scale-110">
          <span className="text-xl">💬</span>
          <span className="text-gray-700 font-medium">
        Converse com quem está doando
          </span>
        </li>
        <li className="bg-white rounded-xl shadow p-4 flex items-center gap-3 border border-gray-100 transition-transform duration-200 hover:scale-110">
          <span className="text-xl">🚪</span>
          <span className="text-gray-700 font-medium">
        Combine a entrega com segurança
          </span>
        </li>
        <li className="bg-white rounded-xl shadow p-4 flex items-center gap-3 border border-gray-100 transition-transform duration-200 hover:scale-110">
          <span className="text-xl">🎉</span>
          <span className="text-gray-700 font-medium">
        Receba ou doe e faça a diferença!
          </span>
        </li>
      </ul>
      </div>
    </section>
  );
}
