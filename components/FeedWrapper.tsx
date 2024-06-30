type Props = {
  children: React.ReactNode;
  className?: string;
};

const FeedWrapper = ({children, className} : Props) => {
  return <div className="flex-1 relative top-0 pb-10">{children}</div>;
};

export default FeedWrapper;
