interface Props {
  value: string | number;
  onChange: (e: any) => void;
  title: string;
  placeholder?: string;
}

const EditField = ({ value, onChange, placeholder, title }: Props) => {
  const type = typeof value === "number" ? "number" : "text";
  return (
    <div className="mt-2 bg-gray-900 w-fit rounded-lg">
      <p className="ml-1 font-bold">{title}</p>
      <input
        className="pl-1 bg-gray-800"
        type={type}
        name={title}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default EditField;
