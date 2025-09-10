import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  listarDoacoes,
  listarUsuarios,
  atualizarDoacao,
  type Doacao,
  type Mensagem,
  type Usuario,
} from "../services/storage";

export default function ChatDoacao() {
  const { id } = useParams();
  const [doacao, setDoacao] = useState<Doacao | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [usuariosCache, setUsuariosCache] = useState<Record<string, Usuario>>(
    {}
  );
  const navigate = useNavigate();

  const usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado") || "null"
  );

  useEffect(() => {
    const todas = listarDoacoes();
    const d = todas.find((d) => d.id === id);
    if (!d) {
      alert("Doação não encontrada");
      navigate("/");
      return;
    }
    setDoacao(d);

    const usuarios = listarUsuarios();
    const cache: Record<string, Usuario> = {};
    usuarios.forEach((u) => (cache[u.id] = u));
    setUsuariosCache(cache);
  }, [id, navigate]);

  const enviarMensagem = () => {
    if (!mensagem.trim() || !doacao || !usuarioLogado) return;

    const novaMsg: Mensagem = {
      autorId: usuarioLogado.id,
      texto: mensagem,
      data: new Date().toLocaleString(),
    };

    const atualizado: Doacao = {
      ...doacao,
      mensagens: [...(doacao.mensagens || []), novaMsg],
    };

    atualizarDoacao(atualizado);
    setDoacao(atualizado);
    setMensagem("");
  };

  if (!doacao) return null;

  // Descobrir com quem está conversando
  let outroUsuario: Usuario | undefined;
  if (usuarioLogado && doacao) {
    if (doacao.userId === usuarioLogado.id) {
      outroUsuario = usuariosCache[doacao.recebidoPor || ""];
    } else {
      outroUsuario = usuariosCache[doacao.userId];
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-4">
        {doacao.imagem && (
          <img
            src={doacao.imagem}
            alt={doacao.nome}
            width={64}
            height={64}
            className="rounded object-cover w-16 h-16"
          />
        )}
        <h2 className="text-2xl font-bold text-gray-800">
          Chat da Doação: {doacao.nome}
        </h2>
      </div>

      <p className="mb-6 text-gray-700">
        Você está conversando com <strong>{outroUsuario?.nome || "Usuário desconhecido"}</strong> sobre a doação do item <strong>{doacao.nome}</strong>.
      </p>

      <ul className="space-y-4 mb-6 max-h-80 overflow-y-auto">
      {(doacao.mensagens || []).map((msg, index) => {
        const autor = usuariosCache[msg.autorId];
        const nomeAutor = autor ? autor.nome : "Usuário desconhecido";

        const isOwn = msg.autorId === usuarioLogado.id;

        return (
        <li
          key={index}
          className={`flex flex-col ${
          isOwn ? "items-end" : "items-start"
          }`}
        >
          <div
          className={`px-4 py-2 rounded-lg max-w-xs break-words ${
            isOwn
            ? "bg-blue-100 text-blue-900"
            : "bg-gray-100 text-gray-800"
          }`}
          >
          <strong>
            {isOwn ? "Você" : nomeAutor}:
          </strong>{" "}
          {msg.texto}
          </div>
          <small className="text-xs text-gray-500 mt-1">
          {msg.data}
          </small>
        </li>
        );
      })}
      </ul>

      <textarea
      value={mensagem}
      onChange={(e) => setMensagem(e.target.value)}
      placeholder="Digite uma mensagem..."
      className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none mb-2"
      />
      <button
      onClick={enviarMensagem}
      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
      Enviar
      </button>
    </div>
  );
}
