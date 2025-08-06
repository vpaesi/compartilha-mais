import { useEffect, useState } from "react";
import { listarDoacoes, type Doacao } from "../services/storage";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
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
    setWhatsapp(usuario.whatsapp || "");

    const doacoes = listarDoacoes();
    const minhasFeitas = doacoes.filter((d) => d.userId === usuario.id);
    const minhasRecebidas = doacoes.filter((d) => d.recebidoPor === usuario.id);

    setFeitas(minhasFeitas);
    setRecebidas(minhasRecebidas);
  }, [navigate]);

  const gerarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Relatório de Doações - Compartilha+", 20, 20);
    doc.setFontSize(12);
    doc.text(`Nome: ${nome}`, 20, 30);
    doc.text(`Email: ${email}`, 20, 38);
    doc.text(`WhatsApp: ${whatsapp}`, 20, 46);
    doc.text(`Doações feitas: ${feitas.length}`, 20, 56);
    doc.text(`Doações recebidas: ${recebidas.length}`, 20, 64);

    doc.text("Últimas doações feitas:", 20, 76);
    feitas.slice(-3).reverse().forEach((d, i) => {
      doc.text(`• ${d.nome} — ${d.status}`, 24, 84 + i * 8);
    });

    const offset = 84 + feitas.slice(-3).length * 8 + 8;
    doc.text("Últimas doações recebidas:", 20, offset);
    recebidas.slice(-3).reverse().forEach((d, i) => {
      doc.text(`• ${d.nome} — doador ID: ${d.userId}`, 24, offset + 8 + i * 8);
    });

    doc.save("relatorio-doacoes.pdf");
  };

  return (
    <div>
      <h2>Meu Perfil</h2>
      <p><strong>Nome:</strong> {nome}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>WhatsApp:</strong> {whatsapp || "Não informado"}</p>

      <h3>📦 Relatório de Doações</h3>
      <p>Total de doações feitas: <strong>{feitas.length}</strong></p>
      <p>Total de doações recebidas: <strong>{recebidas.length}</strong></p>

      <button onClick={gerarPDF}>📄 Exportar relatório em PDF</button>

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
