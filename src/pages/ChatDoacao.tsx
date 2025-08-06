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

  return (
    <div>
      <h2>Chat da Doação: {doacao.nome}</h2>

      <ul>
        {(doacao.mensagens || []).map((msg, index) => {
          const autor = usuariosCache[msg.autorId];
          const nomeAutor = autor ? autor.nome : "Usuário desconhecido";

          return (
            <li key={index}>
              <strong>
                {msg.autorId === usuarioLogado.id ? "Você" : nomeAutor}:
              </strong>{" "}
              {msg.texto}
              <br />
              <small>{msg.data}</small>
            </li>
          );
        })}
      </ul>

      <textarea
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Digite uma mensagem..."
      />
      <br />
      <button onClick={enviarMensagem}>Enviar</button>
    </div>
  );
}
