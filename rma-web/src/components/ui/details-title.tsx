export const DetailsTitle = ({ title, className }: { title: string; className?: string }) => {
  return <h2 className={`text-2xl text-primary font-bold ${className}`}>{title}</h2>;
};
