import React from "react";

interface ItemCardProps {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  imagem?: string;
  verItemButton?: React.ReactNode;
  queroReceberButton?: React.ReactNode;
  className?: string;
}

export default function ItemCard({
  nome,
  descricao,
  categoria,
  imagem,
  verItemButton,
  queroReceberButton,
  className = "",
}: ItemCardProps) {
  return (
    <div
      className={`flex gap-4 p-4 border border-gray-200 rounded-lg items-center bg-white shadow-sm transition-transform duration-150 hover:scale-105 hover:bg-blue-50 focus:outline-none ${className}`}
    >
      {imagem && (
        <img
          src={imagem}
          alt={nome}
          className="w-20 h-20 object-cover rounded-lg max-w-[80px] max-h-[80px]"
        />
      )}
      <div className="flex-1">
        <h4 className="font-bold text-lg text-gray-800">{nome}</h4>
        <p className="text-gray-600 mb-1">{descricao}</p>
        <small className="text-gray-400">Categoria: {categoria}</small>
      </div>
      <div className="flex gap-2 items-center ml-4">
        {verItemButton}
        {queroReceberButton}
      </div>
    </div>
  );
}
