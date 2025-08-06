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
    <div>
      <h2>Ver Minhas Doações</h2>

      <label>Status: </label>
      <select
        value={filtroStatus}
        onChange={(e) => setFiltroStatus(e.target.value)}
      >
        <option value="todas">Todas</option>
        <option value="disponivel">Disponível</option>
        <option value="entregue">Entregue</option>
      </select>

      <label style={{ marginLeft: "1rem" }}>Categoria: </label>
      <select
        value={filtroCategoria}
        onChange={(e) => setFiltroCategoria(e.target.value)}
      >
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
            <li
              key={d.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              {d.imagem && <img src={d.imagem} alt={d.nome} width={100} />}
              <h3>{d.nome}</h3>
              <p>
                <strong>Descrição:</strong> {d.descricao}
              </p>
              <p>
                <strong>Categoria:</strong> {d.categoria}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {d.status === "entregue" ? "✅ Entregue" : "📦 Disponível"}
              </p>

              {d.status === "disponivel" && (
                <button onClick={() => marcarComoEntregue(d.id)}>
                  Marcar como entregue
                </button>
              )}

              {d.status === "disponivel" && (
                <>
                  <button
                    onClick={() => excluirDoacao(d.id)}
                    style={{ color: "red", marginRight: "0.5rem" }}
                  >
                    🗑 Excluir
                  </button>
                  <button onClick={() => navigate(`/editar-doacao/${d.id}`)}>
                    ✏️ Editar
                  </button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
