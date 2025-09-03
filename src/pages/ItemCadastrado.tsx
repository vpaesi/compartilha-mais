import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { listarDoacoes, atualizarDoacao, type Doacao } from "../services/storage";
import QueroReceberButton from "../components/QueroReceberButton";

export default function ItemCadastrado() {
  const { id } = useParams();
  const [doacao, setDoacao] = useState<Doacao | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const todas = listarDoacoes();
    const encontrada = todas.find((d) => d.id === id);
    setDoacao(encontrada || null);
  }, [id]);

  if (!doacao) {
    return (
      <div className="max-w-lg mx-auto mt-16 p-8 bg-white rounded shadow text-center">
        <h2 className="text-xl font-bold mb-4">Item não encontrado</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Voltar
        </button>
      </div>
    );
  }

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || "null");

  const handleReceber = () => {
    if (!usuarioLogado) {
      alert("Você precisa estar logado para receber uma doação.");
      navigate("/login");
      return;
    }

    if (!doacao) return;

    const atualizada: Doacao = {
      ...doacao,
      status: "entregue",
      recebidoPor: usuarioLogado.id,
    };

    atualizarDoacao(atualizada);
    alert("Doação marcada como recebida!");
    navigate(`/chat/${doacao.id}`);
  };

  return (
    <div className="max-w-lg mx-auto mt-16 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Detalhes do Item Cadastrado
      </h2>
      {doacao.imagem && (
        <img
          src={doacao.imagem}
          alt={doacao.nome}
          className="w-40 h-40 object-cover rounded mx-auto mb-4 border"
        />
      )}
      <h3 className="text-lg font-semibold mb-2">{doacao.nome}</h3>
      <p className="mb-1">
        <span className="font-medium">Descrição:</span> {doacao.descricao}
      </p>
      <p className="mb-1">
        <span className="font-medium">Categoria:</span> {doacao.categoria}
      </p>
      <p className="mb-1">
        <span className="font-medium">Status:</span>{" "}
        {doacao.status === "disponivel" ? "Disponível" : "Entregue"}
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={() => navigate(`/chat/${doacao.id}`)}
          className={`w-full bg-blue-600 text-white py-2 rounded transition font-semibold ${doacao.userId === usuarioLogado?.id ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"}`}
          disabled={doacao.userId === usuarioLogado?.id}
        >
          Falar com o doador
        </button>
        <QueroReceberButton
          onClick={handleReceber}
          disabled={doacao.status === "entregue" || doacao.userId === usuarioLogado?.id}
          className="w-full"
        />
      </div>
    </div>
  );
}
