import { Button, Checkbox, Input, Select, Switch } from "antd";
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

const DAYS: Record<string, number> = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
};

// assume that people won't be changing timezones
const TIMES = ["11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm"];

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

const VIRTUAL_STUFF = [
  { label: "Virtual", value: true },
  { label: "In-person", value: false },
];

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
        options={Object.keys(DAYS).map((d) => ({
          name: d,
          toggled: Boolean(daysFreeToMeet[d]),
        }))}
      />
      {Object.entries(daysFreeToMeet)
        .sort((a, b) => DAYS[a[0]] - DAYS[b[0]])
        .map(
          ([key, value]) =>
            value && (
              <div className="preferences__selectdays">
                <SelectField
                  name={`What times on ${key}?`}
                  options={TIMES.map((n) => ({ name: n, toggled: false }))}
                  dispatch={(s: string) => {}}
                  className="preferences__selectdays__select"
                />
                <div className="preferences__selectdays__mode">
                  <Checkbox>Virtual</Checkbox>
                  <br />
                  <Checkbox>In-person</Checkbox>
                </div>
              </div>
            )
        )}
    </>
  );
}
