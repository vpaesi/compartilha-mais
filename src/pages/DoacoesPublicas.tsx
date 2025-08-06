import { useEffect, useState } from "react";
import { type Doacao, listarDoacoes, atualizarDoacao } from "../services/storage";
import { useNavigate } from "react-router-dom";

export default function DoacoesPublicas() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || "null");

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
    .filter((d) =>
      d.nome.toLowerCase().includes(busca.toLowerCase())
    );

  return (
    <div>
      <h2>Doações Disponíveis</h2>

      <label>🔍 Buscar por nome: </label>
      <input
        type="text"
        placeholder="Ex: arroz"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <br />

      <label>📂 Filtrar por categoria: </label>
      <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)}>
        <option value="todas">Todas</option>
        <option value="Alimentos">Alimentos</option>
        <option value="Roupas">Roupas</option>
        <option value="Higiene">Higiene</option>
        <option value="Outros">Outros</option>
      </select>

      <ul>
        {doacoesFiltradas.length === 0 ? (
          <p>Nenhuma doação encontrada.</p>
        ) : (
          doacoesFiltradas.map((d) => (
            <li key={d.id} style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
              {d.imagem && <img src={d.imagem} alt={d.nome} width={100} />}
              <h3>{d.nome}</h3>
              <p><strong>Descrição:</strong> {d.descricao}</p>
              <p><strong>Categoria:</strong> {d.categoria}</p>
              <button onClick={() => handleReceber(d.id)}>Quero receber</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
