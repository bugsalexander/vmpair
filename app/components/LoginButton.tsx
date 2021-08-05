import { Button } from "antd";
import { useState } from "react";

type LoginButtonProps = {
  onClick?: () => void;
};

export const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <Button
      size={"large"}
      type={"default"}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};