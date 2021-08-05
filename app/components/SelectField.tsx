import { Button } from "antd";
import { useState } from "react";
import { DAY } from "../common/types";
import { DaysReducerState } from "../pages/preferences";

type SelectButtonProps = {
  toggled: boolean;
  onChange?: () => void;
};

const SelectButton: React.FC<SelectButtonProps> = ({
  toggled,
  children,
  onChange,
}) => {
  return (
    <Button
      className="preferences__select"
      type={toggled ? "primary" : "default"}
      onClick={onChange}
    >
      {children}
    </Button>
  );
};

type SelectFieldProps = {
  name: string;
  options: Array<{
    name: string;
    toggled: boolean;
  }>;
  dispatch: (s: string) => void;
  className?: string;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  options,
  dispatch,
  className,
}) => {
  return (
    <div className={"selectfield " + className}>
      <p>{name}</p>
      {options.map((opt) => (
        <SelectButton
          key={opt.name}
          toggled={opt.toggled}
          onChange={() => dispatch(opt.name)}
        >
          {opt.name}
        </SelectButton>
      ))}
    </div>
  );
};
