import { Input, Select, Switch } from "antd";
import { Header } from "../components/Header";
import { usePreferences } from "../hooks/usePreferences";
import { FormField } from "../components/FormField";
import { SelectField } from "../components/SelectField";
import { useEffect, useReducer, useState } from "react";
import ApiClient from "../common/apiClient";
import { PreferencesApiResponse } from "../common/types";

const PRONOUNS = {
  HE: "he/him/his",
  SHE: "she/her/hers",
  THEY: "they/them/theirs",
} as const;
type PronounValue = typeof PRONOUNS[keyof typeof PRONOUNS];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function daysFreeReducer(
  state: Record<string, boolean>,
  payload: string | string[]
) {
  if (typeof payload === "string") {
    const newState = { ...state };
    newState[payload] = !state[payload];
    return newState;
  }

  const newState: Record<string, boolean> = {};
  for (const day of payload) {
    newState[day] = true;
  }
  return newState;
}

export default function Preferences() {
  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pronouns, setPronouns] = useState<PronounValue>();
  const [doesWantMatching, setDoesWantMatching] = useState(false);
  const [daysFreeToMeet, daysFreeDispatch] = useReducer(
    daysFreeReducer,
    {} as any
  );

  useEffect(() => {
    ApiClient.getPreferences().then((data) => {
      if (!data.data) return;
      const prefs = data.data;
      setName(prefs.name);
      setEmail(prefs.email);
      setPronouns(prefs.preferredPronouns as any);
      setDoesWantMatching(prefs.doesWantMatching);
      daysFreeDispatch(prefs.daysFreeToMeet);
    });
  }, []);
  return (
    <>
      <Header page="preferences" text={`Edit my preferences!`} />
      <FormField name="Name:" value={name} onChange={setName} />
      <FormField name="Email:" value={email} onChange={setEmail} />
      <FormField name="Preferred pronouns:" value={pronouns}>
        <Select className="preferences__input" defaultValue={pronouns}>
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
          checked={doesWantMatching}
          onChange={() => setDoesWantMatching((v) => !v)}
        />
      </FormField>
      <SelectField
        name="What days can you meet?"
        dispatch={daysFreeDispatch}
        options={DAYS.map((d) => ({
          name: d,
          toggled: Boolean(daysFreeToMeet[d]),
        }))}
      />
    </>
  );
}
