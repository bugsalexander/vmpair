type SubheaderProps = {
  text: string
};

export const Subheader: React.FC<SubheaderProps> = ({
  text
}) => {
  return (
    <div className="login__subheader">{text}</div>
  );
};