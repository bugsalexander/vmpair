import { Button } from "antd";
import { useRouter } from "next/dist/client/router";

type HButtonProps = {
  isDefault?: boolean;
  onClick: () => void;
};

const HButton: React.FC<HButtonProps> = ({ children, isDefault, onClick }) => {
  return (
    <Button type="text" onClick={onClick}>
      {children}
    </Button>
  );
};

const PAGES = ["home", "preferences", "statistics", "login"] as const;
type Pages = typeof PAGES[number];

type HeaderProps = {
  page: Pages;
  text: string;
};

export const Header: React.FC<HeaderProps> = ({ text, page }) => {
  const router = useRouter();

  const onClick = (page: string) => () => {
    router.push(page === "home" ? "/" : page);
  };

  return (
    <div className="header">
      <h1 className="header__text">{text}</h1>
      {PAGES.map((p) => (
        <HButton key={p} isDefault={page === p} onClick={onClick(p)}>
          {p === "login" ? "logout" : p}
        </HButton>
      ))}
    </div>
  );
};
