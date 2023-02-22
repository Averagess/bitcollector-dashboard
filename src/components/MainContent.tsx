interface Props {
  children?: React.ReactNode;
  classes?: string;
}
const MainContent = ({ children, classes }: Props) => {
  return (
    <div
      className={`container flex flex-col p-12 text-slate-200 bg-zinc-900 rounded-xl font-arial border-2 border-red-500 ${classes}`}
    >
      {children}
    </div>
  );
};

export default MainContent;
