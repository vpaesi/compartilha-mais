import { useNavigate } from "react-router-dom";

interface VerItemButtonProps {
  id: string;
  className?: string;
}

export default function VerItemButton({ id, className = "" }: VerItemButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition ${className}`}
      onClick={() => navigate(`/item-cadastrado/${id}`)}
      type="button"
    >
      Ver item
    </button>
  );
}
