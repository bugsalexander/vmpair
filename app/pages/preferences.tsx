import { Input, Select, Switch, Button } from "antd";
import { useState } from "react";
import { Header } from "../components/Header";
import { usePreferences } from "../hooks/usePreferences";

type FormFieldProps = {
  name: string;
  value: string | undefined;
};

const FormField: React.FC<FormFieldProps> = ({ name, value, children }) => {
  return (
    <div className="preferences__textinput">
      <div className="preferences__inline">{name}</div>
      {children ?? <Input className="preferences__input" value={value} />}
    </div>
  );
};

const PRONOUNS = {
  HE: "he/him/his",
  SHE: "she/her/hers",
  THEY: "they/them/theirs",
};

type SelectFieldProps = {
  name: string;
  options: Array<{
    name: string;
    toggled: boolean;
  }>;
};

const SelectButton: React.FC<{ toggled: boolean }> = ({
  toggled,
  children,
}) => {
  const [on, setOn] = useState(toggled);
  return (
    <Button className="preferences__select" type={on ? "primary" : "default"}>
      {children}
    </Button>
  );
};

const SelectField: React.FC<SelectFieldProps> = ({ name, options }) => {
  return (
    <div>
      <div>{name}</div>
      {options.map((opt) => (
        <SelectButton key={opt.name} toggled={opt.toggled}>
          {opt.name}
        </SelectButton>
      ))}
    </div>
  );
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function Home() {
  const preferences = usePreferences();

  return (
    <>
      <Header page="preferences" text={`Edit my preferences!`} />
      <FormField name="Name:" value={preferences?.name} />
      <FormField name="Email:" value={preferences?.email} />
      <FormField name="Preferred pronouns:" value="">
        <Select
          className="preferences__input"
          defaultValue={preferences?.preferredPronouns}
        >
          {Object.entries(PRONOUNS).map(([key, value]) => (
            <Select.Option key={value} value={value}>
              {value}
            </Select.Option>
          ))}
        </Select>
      </FormField>
      <FormField name="Do you want to participate in matching?" value="">
        <Switch
          className="preferences__switch"
          checked={preferences?.doesWantMatching}
        />
      </FormField>
      <SelectField
        name="What days can you meet?"
        options={DAYS.map((d) => ({
          name: d,
          toggled: Boolean(preferences?.daysFreeToMeet.includes(d)),
        }))}
      ></SelectField>
    </>
  );
}
