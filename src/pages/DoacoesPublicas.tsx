import { useEffect, useState } from "react";
import { type Doacao, listarDoacoes } from "../services/storage";

export default function DoacoesPublicas() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");

  useEffect(() => {
    const todas = listarDoacoes();
    const disponiveis = todas.filter((d) => d.status === "disponivel");
    setDoacoes(disponiveis);
  }, []);

  const doacoesFiltradas =
    categoriaFiltro === "todas"
      ? doacoes
      : doacoes.filter((d) => d.categoria === categoriaFiltro);

  return (
    <div>
      <h2>Doações Disponíveis</h2>

      <label>Filtrar por categoria: </label>
      <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)}>
        <option value="todas">Todas</option>
        <option value="Alimentos">Alimentos</option>
        <option value="Roupas">Roupas</option>
        <option value="Higiene">Higiene</option>
        <option value="Outros">Outros</option>
      </select>

      <ul>
        {doacoesFiltradas.length === 0 ? (
          <p>Nenhuma doação disponível nesta categoria.</p>
        ) : (
          doacoesFiltradas.map((d) => (
            <li key={d.id} style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
              {d.imagem && <img src={d.imagem} alt={d.nome} width={100} />}
              <h3>{d.nome}</h3>
              <p><strong>Descrição:</strong> {d.descricao}</p>
              <p><strong>Categoria:</strong> {d.categoria}</p>
              <button disabled>Quero receber</button> {/* lógica futura */}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
