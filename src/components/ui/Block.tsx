const Block = ({ children }: { children: React.ReactNode }) => {
  return <div className="aspect-square rounded-3xl border p-2">{children}</div>;
};

export default Block;
