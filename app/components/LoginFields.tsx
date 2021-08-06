import { Input } from "antd";
import { ChangeEventHandler } from "react";

type LoginFieldsProps = {
  onChange?: (v: string) => void;
};

export const LoginFields: React.FC<LoginFieldsProps> = ({
  onChange,
}) => {
  return (
    <div className="login__flex">
      <div className="login__labels">
        <div>Email:</div>
        <div>Password:</div>
      </div>
      <div className="login__fields" >
        <div className="login__input">
          <Input onChange={onChange ? (e) => onChange(e.target.value) : undefined}/>
        </div>
        <div className="login__input">
          <Input type={"password"}/>
        </div>
      </div>
    </div>
  );
};
