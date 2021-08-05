import { Button } from "antd";
import { useState } from "react";

type LoginButtonProps = {
  onChange?: () => void;
};

export const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  onChange,
}) => {
  return (
    <Button
      className="preferences__select"
      type={"default"}
      onClick={onChange}
    >
      {children}
    </Button>
  );
};