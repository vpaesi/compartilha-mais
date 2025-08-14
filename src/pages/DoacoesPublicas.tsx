
import {
  type Doacao,
  listarDoacoes,
  atualizarDoacao,
} from "../services/storage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DoacoesPublicas() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado") || "null"
  );

  useEffect(() => {
    const todas = listarDoacoes();
    const disponiveis = todas.filter((d) => d.status === "disponivel");
    setDoacoes(disponiveis);
  }, []);

  const handleReceber = (id: string) => {
    if (!usuarioLogado) {
      alert("Você precisa estar logado para receber uma doação.");
      navigate("/login");
      return;
    }

    const doacao = doacoes.find((d) => d.id === id);
    if (!doacao) return;

    const atualizada: Doacao = {
      ...doacao,
      status: "entregue",
      recebidoPor: usuarioLogado.id,
    };

    atualizarDoacao(atualizada);
    setDoacoes((prev) => prev.filter((d) => d.id !== id));
    alert("Doação marcada como recebida!");
    navigate(`/chat/${id}`);
  };

  const doacoesFiltradas = doacoes
    .filter((d) =>
      categoriaFiltro === "todas" ? true : d.categoria === categoriaFiltro
    )
    .filter((d) => d.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Doações Disponíveis</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block mb-1 font-medium">🔍 Buscar por nome:</label>
          <input
            type="text"
            placeholder="Ex: arroz"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">📂 Filtrar por categoria:</label>
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="todas">Todas</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Roupas">Roupas</option>
            <option value="Higiene">Higiene</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
      </div>

      <ul className="space-y-6">
        {doacoesFiltradas.length === 0 ? (
          <li className="text-gray-500 list-none">Nenhuma doação encontrada.</li>
        ) : (
          doacoesFiltradas.map((d) => (
            <li
              key={d.id}
              className="bg-white border border-gray-200 rounded-lg shadow p-6 flex flex-col md:flex-row gap-6 items-center"
            >
              {d.imagem && <img src={d.imagem} alt={d.nome} className="w-28 h-28 object-cover rounded border" />}
              <div className="flex-1 w-full">
                <h3 className="text-lg font-semibold text-blue-700 mb-1">{d.nome}</h3>
                <p className="mb-1"><span className="font-medium">Descrição:</span> {d.descricao}</p>
                <p className="mb-2"><span className="font-medium">Categoria:</span> {d.categoria}</p>
                <button
                  onClick={() => handleReceber(d.id)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded transition-colors shadow"
                >
                  Quero receber
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
