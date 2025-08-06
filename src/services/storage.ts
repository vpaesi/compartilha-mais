export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  whatsapp?: string;
}

export interface Mensagem {
  autorId: string;
  texto: string;
  data: string;
}

export interface Doacao {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  status: "disponivel" | "entregue";
  userId: string;
  criadoEm: string;
  imagem?: string;
  recebidoPor?: string;
  mensagens?: Mensagem[]; // 👈 novo campo
}

// Funções para usuários
export function listarUsuarios(): Usuario[] {
  const usuariosStr = localStorage.getItem("usuarios");
  if (!usuariosStr) return [];
  return JSON.parse(usuariosStr);
}

export function buscarUsuarioPorId(id: string): Usuario | undefined {
  return listarUsuarios().find((u) => u.id === id);
}

export const salvarUsuario = (usuario: Usuario) => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
};

export const buscarUsuarioPorEmailESenha = (email: string, senha: string): Usuario | null => {
  const usuarios: Usuario[] = JSON.parse(localStorage.getItem("usuarios") || "[]");
  return usuarios.find(u => u.email === email && u.senha === senha) || null;
};

// Funções para doações
export const salvarDoacao = (doacao: Doacao) => {
  const doacoes = JSON.parse(localStorage.getItem("doacoes") || "[]");
  doacoes.push(doacao);
  localStorage.setItem("doacoes", JSON.stringify(doacoes));
};

export const listarDoacoes = (): Doacao[] => {
  return JSON.parse(localStorage.getItem("doacoes") || "[]");
};

export const atualizarDoacao = (doacaoAtualizada: Doacao) => {
  let doacoes: Doacao[] = JSON.parse(localStorage.getItem("doacoes") || "[]");
  doacoes = doacoes.map(d => d.id === doacaoAtualizada.id ? doacaoAtualizada : d);
  localStorage.setItem("doacoes", JSON.stringify(doacoes));
};
