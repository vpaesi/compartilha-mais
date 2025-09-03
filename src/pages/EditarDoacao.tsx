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
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Doação</h2>
      <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSalvar();
      }}
      className="space-y-5"
      >
      <div>
        <label className="block text-sm font-medium mb-1">Nome:</label>
        <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descrição:</label>
        <textarea
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Categoria:</label>
        <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
        <option value="Alimentos">Alimentos</option>
        <option value="Roupas">Roupas</option>
        <option value="Higiene">Higiene</option>
        <option value="Outros">Outros</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Imagem (URL):</label>
        <input
        type="text"
        value={imagem}
        onChange={(e) => setImagem(e.target.value)}
        placeholder="URL da imagem"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
      >
        Salvar alterações
      </button>
      </form>
    </div>
  );
}
