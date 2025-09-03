import { useEffect, useState } from "react";
import { type Doacao, listarDoacoes } from "../services/storage";
import ItemCard from "./ItemCard";
import VerItemButton from "./VerItemButton";
import { Link } from "react-router-dom";

export default function AvailableDonationsList() {
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
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">
        📦 Doações disponíveis
      </h2>
      {ultimasDoacoes.length === 0 ? (
        <p className="text-gray-500">Nenhuma doação disponível no momento.</p>
      ) : (
        <ul className="list-none p-0 mb-4">
          {ultimasDoacoes.map((d) => (
            <li key={d.id} className="mb-3">
              <ItemCard
                id={d.id}
                nome={d.nome}
                descricao={d.descricao}
                categoria={d.categoria}
                imagem={d.imagem}
                verItemButton={<VerItemButton id={d.id} />}
              />
            </li>
          ))}
        </ul>
      )}
      <Link
        to="/publicas"
        className="text-blue-600 hover:underline font-medium"
      >
        Ver todas as doações →
      </Link>
    </section>
  );
}
