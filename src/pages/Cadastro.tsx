import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { salvarUsuario, type Usuario } from "../services/storage";
import { v4 as uuidv4 } from "uuid";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const novoUsuario: Usuario = {
      id: uuidv4(),
      nome,
      email,
      senha,
      whatsapp,
    };

    salvarUsuario(novoUsuario);
    alert("Usuário cadastrado com sucesso!");
    navigate("/login");
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="WhatsApp (com DDD)"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
