import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  type Doacao,
  listarDoacoes,
  atualizarDoacao,
} from "../services/storage";

export default function EditarDoacao() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doacao, setDoacao] = useState<Doacao | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("Alimentos");
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    const todas = listarDoacoes();
    const d = todas.find((d) => d.id === id);
    if (!d) {
      alert("Doação não encontrada.");
      navigate("/minhas-doacoes");
      return;
    }
    if (d.status !== "disponivel") {
      alert("Só é possível editar doações disponíveis.");
      navigate("/minhas-doacoes");
      return;
    }

    setDoacao(d);
    setNome(d.nome);
    setDescricao(d.descricao);
    setCategoria(d.categoria);
    setImagem(d.imagem || "");
  }, [id, navigate]);

  const handleSalvar = () => {
    if (!doacao) return;

    const atualizado: Doacao = {
      ...doacao,
      nome,
      descricao,
      categoria,
      imagem,
    };

    atualizarDoacao(atualizado);
    alert("Doação atualizada com sucesso!");
    navigate("/minhas-doacoes");
  };

  return (
    <div>
      <h2>Editar Doação</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSalvar();
        }}
      >
        <label>Nome:</label>
        <br />
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <br />

        <label>Descrição:</label>
        <br />
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <br />

        <label>Categoria:</label>
        <br />
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="Alimentos">Alimentos</option>
          <option value="Roupas">Roupas</option>
          <option value="Higiene">Higiene</option>
          <option value="Outros">Outros</option>
        </select>
        <br />

        <label>Imagem (URL):</label>
        <br />
        <input
          type="text"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          placeholder="URL da imagem"
        />
        <br />
        <br />

        <button type="submit">Salvar alterações</button>
      </form>
    </div>
  );
}
