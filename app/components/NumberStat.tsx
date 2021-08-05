type NumberStatProps = {
  label: string;
  value?: number;
};

export const NumberStat: React.FC<NumberStatProps> = ({
  label,
  value
}) => {
  return (
    <div className="statistics__text">
      <div className="statistics__label">{label}</div>
      <div className="statistics__value">{value}</div>
    </div>
  );
};
