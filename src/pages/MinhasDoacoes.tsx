import { useEffect, useState } from "react";
import {
  type Doacao,
  listarDoacoes,
  atualizarDoacao,
} from "../services/storage";
import { useNavigate } from "react-router-dom";

export default function MinhasDoacoes() {
  const [minhasDoacoes, setMinhasDoacoes] = useState<Doacao[]>([]);
  const [filtroStatus, setFiltroStatus] = useState("todas");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("usuarioLogado");
    if (!user) {
      alert("Você precisa estar logado para acessar essa página.");
      navigate("/login");
      return;
    }

    const usuario = JSON.parse(user);
    const todas = listarDoacoes();
    const minhas = todas.filter((d) => d.userId === usuario.id);
    setMinhasDoacoes(minhas);
  }, [navigate]);

  const marcarComoEntregue = (id: string) => {
    if (!confirm("Tem certeza que deseja marcar esta doação como entregue?")) return;
    const doacao = minhasDoacoes.find((d) => d.id === id);
    if (!doacao) return;

    const atualizada = { ...doacao, status: "entregue" as const };
    atualizarDoacao(atualizada);
    setMinhasDoacoes((prev) => prev.map((d) => (d.id === id ? atualizada : d)));
  };

  const excluirDoacao = (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta doação?")) return;

    const atualizadas = minhasDoacoes.filter((d) => d.id !== id);
    localStorage.setItem("doacoes", JSON.stringify(atualizadas));
    setMinhasDoacoes(atualizadas);
  };

  const doacoesFiltradas = minhasDoacoes
    .filter((d) =>
      filtroStatus === "todas" ? true : d.status === filtroStatus
    )
    .filter((d) =>
      filtroCategoria === "todas" ? true : d.categoria === filtroCategoria
    );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Ver Minhas Doações</h2>

      <div className="flex flex-wrap items-center gap-4 mb-6">
      <label className="font-medium">Status:</label>
      <select
        value={filtroStatus}
        onChange={(e) => setFiltroStatus(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="todas">Todas</option>
        <option value="disponivel">Disponível</option>
        <option value="entregue">Entregue</option>
      </select>

      <label className="font-medium ml-4">Categoria:</label>
      <select
        value={filtroCategoria}
        onChange={(e) => setFiltroCategoria(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="todas">Todas</option>
        <option value="Alimentos">Alimentos</option>
        <option value="Roupas">Roupas</option>
        <option value="Higiene">Higiene</option>
        <option value="Outros">Outros</option>
      </select>
      </div>

      <ul>
      {doacoesFiltradas.length === 0 ? (
        <p className="text-center text-gray-500">Nenhuma doação encontrada.</p>
      ) : (
        doacoesFiltradas.map((d) => (
        <li
          key={d.id}
          className="border rounded-lg shadow-sm p-0 mb-4 hover:bg-blue-50 transition-transform duration-200 hover:scale-105"
        >
          <button
            onClick={() => navigate(`/item-cadastrado/${d.id}`)}
            className="w-full flex flex-col md:flex-row gap-4 items-start text-left p-4 bg-transparent border-0 focus:outline-none"
            tabIndex={0}
            aria-label={`Ver detalhes do item ${d.nome}`}
          >
            {d.imagem && (
              <img
                src={d.imagem}
                alt={d.nome}
                width={100}
                className="rounded object-cover w-24 h-24"
              />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{d.nome}</h3>
              <p>
                <span className="font-medium">Descrição:</span> {d.descricao}
              </p>
              <p>
                <span className="font-medium">Categoria:</span> {d.categoria}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {d.status === "entregue" ? (
                  <span className="text-green-600 font-semibold">✅ Entregue</span>
                ) : (
                  <span className="text-blue-600 font-semibold">📦 Disponível</span>
                )}
              </p>
            </div>
          </button>
          <div className="mb-4 ml-4 px-4 pb-4 md:pb-0 md:px-0 flex gap-2 flex-wrap">
            {d.status === "disponivel" && (
              <button
                onClick={() => marcarComoEntregue(d.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
              >
                Marcar como entregue
              </button>
            )}
            {d.status === "disponivel" && (
              <>
                <button
                  onClick={() => excluirDoacao(d.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                >
                  🗑 Excluir
                </button>
                <button
                  onClick={() => navigate(`/editar-doacao/${d.id}`)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded transition"
                >
                  ✏️ Editar
                </button>
              </>
            )}
          </div>
        </li>
        ))
      )}
      </ul>
    </div>
  );
}
