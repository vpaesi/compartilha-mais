import { useEffect, useState } from "react";
import { type Doacao, listarDoacoes, atualizarDoacao } from "../services/storage";
import { useNavigate } from "react-router-dom";

export default function MinhasDoacoes() {
  const [minhasDoacoes, setMinhasDoacoes] = useState<Doacao[]>([]);
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

    setMinhasDoacoes((prev) =>
      prev.map((d) => (d.id === id ? atualizada : d))
    );
  };

  return (
    <div>
      <h2>Minhas Doações</h2>

      {minhasDoacoes.length === 0 ? (
        <p>Você ainda não fez nenhuma doação.</p>
      ) : (
        <ul>
          {minhasDoacoes.map((d) => (
            <li key={d.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
              {d.imagem && <img src={d.imagem} alt={d.nome} width={100} />}
              <h3>{d.nome}</h3>
              <p><strong>Descrição:</strong> {d.descricao}</p>
              <p><strong>Categoria:</strong> {d.categoria}</p>
              <p><strong>Status:</strong> {d.status === "entregue" ? "✅ Entregue" : "📦 Disponível"}</p>

              {d.status === "disponivel" && (
                <button onClick={() => marcarComoEntregue(d.id)}>Marcar como entregue</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
