

interface Props {
  value: string | number;
  onChange: (e: any) => void;
  title: string;
  placeholder?: string;
}

const EditField= ({ value, onChange, placeholder, title }: Props) => {
  const type = typeof value === "number" ? "number" : "text"
  return(
    <div className="edit-field">
      <p>{title}</p>
      <input type={type} name={title} value={value} onChange={(e) => onChange(e)} placeholder={placeholder} />
    </div>
  )
}

export default EditField