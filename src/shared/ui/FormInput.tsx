interface FormInputProps {
  id?: string;
  name?: string;
  type: string;
  label: string;
  value?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  id,
  name,
  type,
  label,
  value,
  error,
  placeholder,
  required,
  onChange,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 bg-white/10 border ${
          error ? "border-red-500" : "border-white/20"
        } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary transition-colors`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
}
