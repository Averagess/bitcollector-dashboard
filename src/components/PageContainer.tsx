interface Props {
  children?: React.ReactNode;
}

const PageContainer = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-full w-full items-center">{children}</div>
  );
};

export default PageContainer;
