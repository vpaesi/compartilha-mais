import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Compartilha+</h1>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/cadastro">Cadastro</Link> | <Link to="/nova-doacao">Nova Doação</Link> | <Link to="/minhas-doacoes">Minhas Doações</Link>
      </nav>
    </div>
  );
}
