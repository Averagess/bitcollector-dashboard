interface Props {
  onClick?: (e?: any) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  name?: string;
  type?: "button" | "submit" | "reset";
}

const GenericButton = ({
  onClick,
  children,
  name,
  type,
  disabled = false,
}: Props) => {
  return (
    <button
      name={name}
      disabled={disabled}
      type={type}
      onClick={onClick}
      className="m-3 p-3 w-full max-w-xl rounded-xl border-2 text-white border-gray-900 bg-neutral-800 hover:bg-neutral-700 active:shadow-button"
    >
      {children}
    </button>
  );
};

export default GenericButton;
