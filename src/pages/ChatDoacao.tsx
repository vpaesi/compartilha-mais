import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { listarDoacoes, atualizarDoacao, type Doacao, type Mensagem } from "../services/storage";

export default function ChatDoacao() {
  const { id } = useParams();
  const [doacao, setDoacao] = useState<Doacao | null>(null);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "null");

  useEffect(() => {
    const todas = listarDoacoes();
    const d = todas.find((d) => d.id === id);
    if (!d) {
      alert("Doação não encontrada");
      navigate("/");
      return;
    }
    setDoacao(d);
  }, [id, navigate]);

  const enviarMensagem = () => {
    if (!mensagem.trim() || !doacao || !usuario) return;

    const novaMsg: Mensagem = {
      autorId: usuario.id,
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
        {(doacao.mensagens || []).map((msg, index) => (
          <li key={index}>
            <strong>{msg.autorId === usuario.id ? "Você" : "Outro"}:</strong> {msg.texto}
            <br /><small>{msg.data}</small>
          </li>
        ))}
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
