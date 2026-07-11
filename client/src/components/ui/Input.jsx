function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required = false,
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-600"
      />
    </div>
  );
}

export default Input;