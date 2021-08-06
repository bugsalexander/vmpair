import { Button } from "antd";
import { useState } from "react";

type LoginButtonProps = {
  login?: boolean;
  onClick?: () => void;
};

export const LoginButton: React.FC<LoginButtonProps> = ({
  login,
  children,
  onClick,
}) => {
  const color = login ? "blue" : "green"
  return (
    <Button
      type={"default"}
      onClick={onClick}
      className={"login__button--" + color}
    >
      {children}
    </Button>
  );
};