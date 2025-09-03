
import {
  type Doacao,
  listarDoacoes,
  atualizarDoacao,
} from "../services/storage";
import ItemCard from "../components/ItemCard";
import VerItemButton from "../components/VerItemButton";
import QueroReceberButton from "../components/QueroReceberButton";
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
      <h2 className="text-2xl font-bold mb-6 text-center">Doações Disponíveis</h2>

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
              className="bg-white border border-gray-200 rounded-lg shadow p-0 flex flex-col md:flex-row gap-6 items-center hover:bg-blue-50 transition"
            >
              <ItemCard
                id={d.id}
                nome={d.nome}
                descricao={d.descricao}
                categoria={d.categoria}
                imagem={d.imagem}
                verItemButton={<VerItemButton id={d.id} />}
                queroReceberButton={
                  <QueroReceberButton
                    onClick={() => handleReceber(d.id)}
                    disabled={d.status === "entregue" || d.userId === usuarioLogado?.id}
                  />
                }
                className="flex-1 w-full p-6 gap-6 items-center"
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
