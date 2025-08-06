import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarUsuarioPorEmailESenha } from "../services/storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const usuario = buscarUsuarioPorEmailESenha(email, senha);

    if (usuario) {
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      alert("Login bem-sucedido!");
      navigate("/");
    } else {
      alert("E-mail ou senha inválidos.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
