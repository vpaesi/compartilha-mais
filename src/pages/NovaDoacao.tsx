import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type Doacao, salvarDoacao } from "../services/storage";
import { v4 as uuidv4 } from "uuid";

export default function NovaDoacao() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("Alimentos");
  const [imagem, setImagem] = useState<string | undefined>(undefined);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("usuarioLogado");
    if (!user) {
      alert("Você precisa estar logado para cadastrar uma doação.");
      navigate("/login");
    } else {
      setUsuarioId(JSON.parse(user).id);
    }
  }, [navigate]);

  const handleImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuarioId) return;

    const novaDoacao: Doacao = {
      id: uuidv4(),
      nome,
      descricao,
      categoria,
      imagem,
      status: "disponivel",
      userId: usuarioId,
      criadoEm: new Date().toISOString(),
    };

    salvarDoacao(novaDoacao);
    alert("Doação cadastrada com sucesso!");
    navigate("/minhas-doacoes");
  };

  return (
    <div>
      <h2>Nova Doação</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do item"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <br />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="Alimentos">Alimentos</option>
          <option value="Roupas">Roupas</option>
          <option value="Higiene">Higiene</option>
          <option value="Outros">Outros</option>
        </select>
        <br />
        <input type="file" accept="image/*" onChange={handleImagem} />
        <br />
        {imagem && <img src={imagem} alt="Prévia" width={120} />}
        <br />
        <button type="submit">Cadastrar Doação</button>
      </form>
    </div>
  );
}
