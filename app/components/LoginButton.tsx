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
  const color = login ? "#1890ff" : "#2ec23f"
  return (
    <Button
      type={"default"}
      onClick={onClick}
      style={{ 
        borderColor: color, 
        color: "white",
        backgroundColor: color,
      }}
    >
      {children}
    </Button>
  );
};