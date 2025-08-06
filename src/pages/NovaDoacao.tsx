export default function NovaDoacao() {
  return (
    <div>
      <h1>Nova Doação</h1>
      <form>
        <div>
          <label>Título:</label>
          <input type="text" />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea />
        </div>
        <button type="submit">Criar Doação</button>
      </form>
    </div>
  );
}
