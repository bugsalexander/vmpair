import { Input } from "antd";
import { ChangeEventHandler } from "react";

type FormFieldProps = {
  name?: string;
  value?: any;
  onChange?: (v: string) => void;
  disabled?: boolean;
};

export const FormField: React.FC<FormFieldProps> = ({
  name,
  value,
  children,
  onChange,
  disabled
}) => {
  return (
    <div className="preferences__textinput">
      <div className="preferences__inline">{name}</div>
      {children ?? (
        <Input
          disabled={disabled}
          className="preferences__input"
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
      )}
    </div>
  );
};
