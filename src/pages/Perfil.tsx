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
    feitas
      .slice(-3)
      .reverse()
      .forEach((d, i) => {
        doc.text(`• ${d.nome} — ${d.status}`, 24, 84 + i * 8);
      });

    const offset = 84 + feitas.slice(-3).length * 8 + 8;
    doc.text("Últimas doações recebidas:", 20, offset);
    recebidas
      .slice(-3)
      .reverse()
      .forEach((d, i) => {
        doc.text(
          `• ${d.nome} — doador ID: ${d.userId}`,
          24,
          offset + 8 + i * 8
        );
      });

    doc.save("relatorio-doacoes.pdf");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Meu Perfil</h2>
      <p className="mb-2">
      <strong className="text-gray-700">Nome:</strong> {nome}
      </p>
      <p className="mb-2">
      <strong className="text-gray-700">Email:</strong> {email}
      </p>
      <p className="mb-6">
      <strong className="text-gray-700">WhatsApp:</strong> {whatsapp || "Não informado"}
      </p>

      <h3 className="text-xl font-semibold mb-2 text-blue-700">📦 Relatório de Doações</h3>
      <p>
      Total de doações feitas: <strong className="text-green-700">{feitas.length}</strong>
      </p>
      <p className="mb-4">
      Total de doações recebidas: <strong className="text-green-700">{recebidas.length}</strong>
      </p>

      <button
      onClick={gerarPDF}
      className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
      📄 Exportar relatório em PDF
      </button>

      <h4 className="text-lg font-medium mt-4 mb-2 text-gray-800">Minhas últimas doações feitas:</h4>
      <ul className="list-disc list-inside mb-6">
      {feitas
        .slice(-3)
        .reverse()
        .map((d) => (
        <li key={d.id} className="mb-1">
          {d.nome} —{" "}
          {d.status === "entregue" ? (
          <span className="text-green-600 font-semibold">✅ Entregue</span>
          ) : (
          <span className="text-yellow-600 font-semibold">📦 Disponível</span>
          )}
        </li>
        ))}
      </ul>

      <h4 className="text-lg font-medium mb-2 text-gray-800">Últimas doações recebidas:</h4>
      <ul className="list-disc list-inside">
      {recebidas
        .slice(-3)
        .reverse()
        .map((d) => (
        <li key={d.id} className="mb-1">
          {d.nome} — <span className="text-blue-700">de usuário ID: {d.userId}</span>
        </li>
        ))}
      </ul>
    </div>
  );
}
