function Button({
  text,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) {
  const baseStyle =
    "w-full px-5 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl",

    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300",

    danger:
      "bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]}`}
    >
      {text}
    </button>
  );
}

export default Button;