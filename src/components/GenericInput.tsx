

interface Props {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
}

const GenericInput = ({ placeholder, value, onChange, type = "text", disabled = false }: Props) => {
  return (
    <input
      disabled={disabled}
      className="m-3 p-3 rounded-xl border-2 border-gray-900 bg-neutral-800"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      />
  )
};

export default GenericInput;