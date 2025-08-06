import { useEffect, useState } from "react";
import { type Doacao, listarDoacoes, buscarUsuarioPorId } from "../services/storage";
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

    // Doações onde o usuário é doador ou receptor E tem mensagens
    const comChat = todas.filter(
      (d) =>
        (d.userId === usuario.id || d.recebidoPor === usuario.id) &&
        d.mensagens &&
        d.mensagens.length > 0
    );

    setDoacoesComChat(comChat);
  }, [navigate]);

  return (
    <div>
      <h2>Chats Ativos</h2>

      {doacoesComChat.length === 0 ? (
        <p>Você não tem chats ativos no momento.</p>
      ) : (
        <ul>
          {doacoesComChat.map((d) => {
            // Nome do outro usuário (doador ou receptor)
            const usuarioIdLogado = JSON.parse(localStorage.getItem("usuarioLogado") || "null")?.id;
            const outroUsuarioId = d.userId === usuarioIdLogado ? d.recebidoPor : d.userId;

            const outroUsuario = buscarUsuarioPorId(outroUsuarioId || "") || { nome: "Usuário desconhecido" };

            return (
              <li
                key={d.id}
                style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem", cursor: "pointer" }}
                onClick={() => navigate(`/chat/${d.id}`)}
              >
                <h3>{d.nome}</h3>
                <p>
                  Conversa com: <strong>{outroUsuario.nome}</strong>
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
