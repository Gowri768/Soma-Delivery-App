import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function BackButton({ text = "Back" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium transition mb-6"
    >
      <ArrowLeft size={20} />
      <span>{text}</span>
    </button>
  );
}

export default BackButton;