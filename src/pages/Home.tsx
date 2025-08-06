import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { type Doacao, listarDoacoes } from "../services/storage";
import helpingEachOther from "../assets/helping_each_other.svg";
import sharingArticles from "../assets/sharing_articles.svg";

export default function Home() {
  const usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado") || "null"
  );
  const [ultimasDoacoes, setUltimasDoacoes] = useState<Doacao[]>([]);

  useEffect(() => {
    const todas = listarDoacoes()
      .filter((d) => d.status === "disponivel")
      .sort(
        (a, b) =>
          new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
      );

    setUltimasDoacoes(todas.slice(0, 3));
  }, []);

  return (
    <div style={estilos.container}>
      <section style={estilos.hero}>
        <img
          src={helpingEachOther}
          alt="Compartilhando"
          style={estilos.imagemTopo}
        />
        <h1 style={estilos.titulo}>🌟 Compartilha+</h1>
        <p style={estilos.subtitulo}>
          Conectando pessoas para compartilhar o que realmente importa.
        </p>
        {!usuarioLogado ? (
          <div style={estilos.acoes}>
            <Link to="/login" style={estilos.botao}>
              Entrar
            </Link>
            <Link to="/cadastro" style={estilos.botaoSecundario}>
              Criar conta
            </Link>
          </div>
        ) : (
          <div style={estilos.acoes}>
            <Link to="/publicas" style={estilos.botao}>
              Ver Doações
            </Link>
            <Link to="/minhas-doacoes" style={estilos.botaoSecundario}>
              Minhas Doações
            </Link>
          </div>
        )}
      </section>

      <section style={estilos.secao}>
        <h2>📦 Últimas Doações Públicas</h2>
        {ultimasDoacoes.length === 0 ? (
          <p>Nenhuma doação disponível no momento.</p>
        ) : (
          <ul style={estilos.listaDoacoes}>
            {ultimasDoacoes.map((d) => (
              <li key={d.id} style={estilos.cardDoacao}>
                {d.imagem && (
                  <img src={d.imagem} alt={d.nome} style={estilos.imgDoacao} />
                )}
                <div>
                  <h4>{d.nome}</h4>
                  <p>{d.descricao}</p>
                  <small>Categoria: {d.categoria}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Link to="/doacoes">Ver todas as doações →</Link>
      </section>

      <section style={estilos.secao}>
        <h2>🎯 Como funciona?</h2>
        <img
          src={sharingArticles}
          alt="Como funciona"
          style={estilos.imagem}
        />
        <ul>
          <li>✅ Cadastre-se gratuitamente</li>
          <li>📦 Doe itens que não usa mais</li>
          <li>🙋‍♀️ Solicite itens disponíveis</li>
          <li>💬 Converse com quem está doando</li>
          <li>🚪 Combine a entrega com segurança</li>
        </ul>
      </section>

      <footer style={estilos.rodape}>
        <p>🌍 Projeto de Extensão | ADS - 2025</p>
      </footer>
    </div>
  );
}

const estilos = {
  container: {
    maxWidth: "850px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "sans-serif",
  },
  hero: {
    textAlign: "center" as const,
    marginBottom: "3rem",
    backgroundColor: "#f3f4f6",
    padding: "2rem",
    borderRadius: "10px",
  },
  titulo: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
    color: "#2d3748",
  },
  subtitulo: {
    fontSize: "1.2rem",
    color: "#4a5568",
  },
  imagemTopo: {
    width: "160px",
    marginBottom: "1rem",
  },
  imagem: {
    width: "100%",
    maxWidth: "300px",
    margin: "1rem auto",
    display: "block",
  },
  acoes: {
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap" as const,
  },
  botao: {
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  botaoSecundario: {
    backgroundColor: "#e2e8f0",
    color: "#2d3748",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  secao: {
    marginBottom: "3rem",
  },
  rodape: {
    marginTop: "3rem",
    textAlign: "center" as const,
    fontSize: "0.9rem",
    color: "#718096",
  },
  listaDoacoes: {
    listStyle: "none",
    padding: 0,
    marginBottom: "1rem",
  },
  cardDoacao: {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginBottom: "1rem",
    alignItems: "center",
  },
  imgDoacao: {
    width: "80px",
    height: "80px",
    objectFit: "cover" as const,
    borderRadius: "8px",
  },
};
