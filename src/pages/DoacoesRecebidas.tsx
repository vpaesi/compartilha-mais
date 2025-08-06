import { useEffect, useState } from "react";
import { type Doacao, listarDoacoes } from "../services/storage";
import { useNavigate } from "react-router-dom";

export default function DoacoesRecebidas() {
  const [doacoesRecebidas, setDoacoesRecebidas] = useState<Doacao[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogado");
    if (!usuario) {
      alert("Você precisa estar logado para ver suas doações recebidas.");
      navigate("/login");
      return;
    }

    const user = JSON.parse(usuario);
    const todas = listarDoacoes();
    const recebidas = todas.filter((d) => d.recebidoPor === user.id);
    setDoacoesRecebidas(recebidas);
  }, [navigate]);

  return (
    <div>
      <h2>Doações que Recebi</h2>

      {doacoesRecebidas.length === 0 ? (
        <p>Você ainda não recebeu nenhuma doação.</p>
      ) : (
        <ul>
          {doacoesRecebidas.map((d) => (
            <li
              key={d.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              {d.imagem && <img src={d.imagem} alt={d.nome} width={100} />}
              <h3>{d.nome}</h3>
              <p>
                <strong>Descrição:</strong> {d.descricao}
              </p>
              <p>
                <strong>Categoria:</strong> {d.categoria}
              </p>
              <p>
                <strong>Status:</strong> ✅ Recebida
              </p>
              <p>
                <strong>Doado por ID:</strong> {d.userId}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
