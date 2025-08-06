import { useEffect, useState } from "react";
import { listarDoacoes, type Doacao } from "../services/storage";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [feitas, setFeitas] = useState<Doacao[]>([]);
  const [recebidas, setRecebidas] = useState<Doacao[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("usuarioLogado");
    if (!user) {
      alert("Você precisa estar logado para ver o perfil.");
      navigate("/login");
      return;
    }

    const usuario = JSON.parse(user);
    setNome(usuario.nome);
    setEmail(usuario.email);

    const doacoes = listarDoacoes();
    const minhasFeitas = doacoes.filter((d) => d.userId === usuario.id);
    const minhasRecebidas = doacoes.filter((d) => d.recebidoPor === usuario.id);

    setFeitas(minhasFeitas);
    setRecebidas(minhasRecebidas);
  }, [navigate]);

  return (
    <div>
      <h2>Meu Perfil</h2>
      <p><strong>Nome:</strong> {nome}</p>
      <p><strong>Email:</strong> {email}</p>

      <h3>📦 Relatório de Doações</h3>
      <p>Total de doações feitas: <strong>{feitas.length}</strong></p>
      <p>Total de doações recebidas: <strong>{recebidas.length}</strong></p>

      <h4>Minhas últimas doações feitas:</h4>
      <ul>
        {feitas.slice(-3).reverse().map((d) => (
          <li key={d.id}>
            {d.nome} — {d.status === "entregue" ? "✅ Entregue" : "📦 Disponível"}
          </li>
        ))}
      </ul>

      <h4>Últimas doações recebidas:</h4>
      <ul>
        {recebidas.slice(-3).reverse().map((d) => (
          <li key={d.id}>
            {d.nome} — de usuário ID: {d.userId}
          </li>
        ))}
      </ul>
    </div>
  );
}
