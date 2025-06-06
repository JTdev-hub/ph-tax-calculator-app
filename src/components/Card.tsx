import "../index.css";

interface Props {
  children?: React.ReactNode;
  className: string;
}
const Card = ({ children, className }: Props) => {
  return <div className={className}>{children}</div>;
};

export default Card;
