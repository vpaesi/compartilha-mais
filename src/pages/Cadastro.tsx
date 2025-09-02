import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { salvarUsuario, type Usuario } from "../services/storage";
import { validarNome, validarWhatsapp, aplicarMascaraWhatsapp } from "../services/validations";
import { v4 as uuidv4 } from "uuid";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [erroWhatsapp, setErroWhatsapp] = useState("");
  const [erroNome, setErroNome] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarNome(nome)) {
      setErroNome("O nome deve conter apenas letras.");
      return;
    } else {
      setErroNome("");
    }

    if (!validarWhatsapp(whatsapp)) {
      setErroWhatsapp("WhatsApp deve estar no formato (XX)XXXXX-XXXX.");
      return;
    } else {
      setErroWhatsapp("");
    }

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
    <div className="max-w-md mx-auto mt-16 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Cadastro</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {erroNome && (
          <span className="text-red-500 text-sm">{erroNome}</span>
        )}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="WhatsApp (com DDD)"
          value={whatsapp}
          onChange={(e) => setWhatsapp(aplicarMascaraWhatsapp(e.target.value))}
          required
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {erroWhatsapp && (
          <span className="text-red-500 text-sm">{erroWhatsapp}</span>
        )}
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
          Cadastrar
        </button>
      </form>
    </div>
  );
}
