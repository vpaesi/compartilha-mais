interface QueroReceberButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function QueroReceberButton({ onClick, disabled, className = "" }: QueroReceberButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-green-600 text-white font-semibold px-4 py-2 rounded transition-colors shadow ${
        disabled ? "opacity-60 cursor-not-allowed" : "hover:bg-green-700"
      } ${className}`}
    >
      Quero receber
    </button>
  );
}
