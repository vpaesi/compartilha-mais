// lógica do localStorage aqui

// Tipos
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
}

export interface Doacao {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  status: "disponivel" | "entregue";
  userId: string;
  criadoEm: string;
  imagem?: string; // base64 ou url
}

// Funções para usuários
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
