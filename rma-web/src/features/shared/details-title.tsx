export const DetailsTitle = ({ title, className }: { title: string; className?: string }) => {
  return <h2 className={`text-2xl text-primary font-bold ${className}`}>{title}</h2>;
};

export const DetailsTitleWithBox = ({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={`rounded-md box ${className}`}>
      <h2
        className={`text-xl text-primary font-bold bg-primary/20 my-3 py-2 px-4 w-fit rounded-r-full relative`}
      >
        <div className='absolute top-0 right-0 w-full bg-primary'></div>
        {title}
      </h2>
      {children}
    </div>
  );
};
