import { useEffect, useState } from "react";
import {
  type Doacao,
  listarDoacoes,
  buscarUsuarioPorId,
} from "../services/storage";
import { useNavigate } from "react-router-dom";

export default function ChatsAtivos() {
  const [doacoesComChat, setDoacoesComChat] = useState<Doacao[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("usuarioLogado");
    if (!userStr) {
      alert("Você precisa estar logado para acessar os chats.");
      navigate("/login");
      return;
    }

    const usuario = JSON.parse(userStr);
    const todas = listarDoacoes();

    const comChat = todas.filter(
      (d) =>
        (d.userId === usuario.id || d.recebidoPor === usuario.id) &&
        d.mensagens &&
        d.mensagens.length > 0
    );

    setDoacoesComChat(comChat);
  }, [navigate]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Chats Ativos</h2>

      {doacoesComChat.length === 0 ? (
      <p className="text-gray-500 text-center">Você não tem chats ativos no momento.</p>
      ) : (
      <ul className="space-y-4">
        {doacoesComChat.map((d) => {
        const usuarioIdLogado = JSON.parse(
          localStorage.getItem("usuarioLogado") || "null"
        )?.id;
        const outroUsuarioId =
          d.userId === usuarioIdLogado ? d.recebidoPor : d.userId;

        const outroUsuario = buscarUsuarioPorId(outroUsuarioId || "") || {
          nome: "Usuário desconhecido",
        };

        return (
          <li
            key={d.id}
            className="border border-gray-300 rounded-lg p-4 group hover:bg-blue-50 hover:border-blue-400 transition cursor-pointer flex items-center gap-4"
          >
            {d.imagem && (
              <img
                src={d.imagem}
                alt={d.nome}
                width={56}
                height={56}
                className="rounded object-cover w-14 h-14"
              />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{d.nome}</h3>
              <p className="text-gray-600">
                Conversa com: <strong className="text-gray-800">{outroUsuario.nome}</strong>
              </p>
            </div>
            <button
              onClick={() => navigate(`/chat/${d.id}`)}
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            >
              Ver chat
            </button>
          </li>
        );
        })}
      </ul>
      )}
    </div>
  );
}
