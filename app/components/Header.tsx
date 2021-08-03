type HeaderProps = {
  text: string;
};

export const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <div className="header">
      <h1 className="header__text">{text}</h1>
      <button>Home</button>
      <button>Preferences</button>
      <button>Stats</button>
    </div>
  );
};
