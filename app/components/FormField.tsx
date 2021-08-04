import { Input } from "antd";
import { ChangeEventHandler } from "react";

type FormFieldProps = {
  name: string;
  value: string | undefined;
  onChange?: (v: string) => void;
};

export const FormField: React.FC<FormFieldProps> = ({
  name,
  value,
  children,
  onChange,
}) => {
  return (
    <div className="preferences__textinput">
      <div className="preferences__inline">{name}</div>
      {children ?? (
        <Input
          className="preferences__input"
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
      )}
    </div>
  );
};
