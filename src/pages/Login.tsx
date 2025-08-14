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
    <div className="max-w-md mx-auto mt-16 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors mt-2 shadow"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
