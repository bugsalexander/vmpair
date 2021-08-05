import { Checkbox, Select, Switch } from "antd";
import { Header } from "../components/Header";
import { FormField } from "../components/FormField";
import { SelectField } from "../components/SelectField";
import { ReducerAction, useEffect, useReducer, useState } from "react";
import ApiClient from "../common/apiClient";
import {
  DAY,
  DAYS,
  DAYS_ARR,
  PreferencesApiResponse,
  PRONOUNS,
  PronounValue,
  TIMES_ARR,
} from "../common/types";

// new reducer type:
export type DaysReducerState = Record<
  DAY,
  {
    include: boolean;
    virtual: boolean;
    inPerson: boolean;
    t0: boolean;
    t1: boolean;
    t2: boolean;
    t3: boolean;
    t4: boolean;
  }
>;

function daysFreeReducer(
  state: DaysReducerState | null,
  payload: { day: DAY; field: keyof DaysReducerState[DAY] } | DaysReducerState
) {
  if (state === null) {
    return payload as DaysReducerState | null;
  }
  const newState = { ...state };
  if ("day" in payload) {
    // make inner shallow copy
    newState[payload.day] = { ...state[payload.day] };
    newState[payload.day][payload.field] = !state[payload.day][payload.field];
    return newState;
  }
  return state;
}

function initializeDaysFreeReducerState(prefs: PreferencesApiResponse) {
  const state: DaysReducerState = {} as any;
  for (const currentDay of DAYS_ARR) {
    const dayIndex = prefs.daysFreeToMeet.indexOf(currentDay);
    if (dayIndex != -1) {
      const byDay = prefs.availabilityByDay[dayIndex];
      state[currentDay] = {
        include: true,
        // assume that order of daysFreeToMeet is same day order as availabilityByDay
        virtual: byDay.canVirtual,
        inPerson: byDay.canInPerson,
        t0: byDay.times.includes(TIMES_ARR[0]),
        t1: byDay.times.includes(TIMES_ARR[1]),
        t2: byDay.times.includes(TIMES_ARR[2]),
        t3: byDay.times.includes(TIMES_ARR[3]),
        t4: byDay.times.includes(TIMES_ARR[4]),
      };
    } else {
      // push something blank
      state[currentDay] = {
        include: false,
        virtual: false,
        inPerson: false,
        t0: false,
        t1: false,
        t2: false,
        t3: false,
        t4: false,
      };
    }
  }
  return state;
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
  const [daysFreeToMeet, daysFreeDispatch] = useReducer(daysFreeReducer, null);

  useEffect(() => {
    ApiClient.getPreferences().then((data) => {
      if (!data.data) return;
      const prefs = data.data;
      setName(prefs.name);
      setEmail(prefs.email);
      setPronouns(prefs.preferredPronouns as any);
      setDoesWantMatching(prefs.doesWantMatching);
      daysFreeDispatch(initializeDaysFreeReducerState(prefs));
    });
  }, []);
  return (
    <>
      <Header page="preferences" text={`Edit my preferences!`} />
      <FormField name="Name:" value={name} onChange={setName} />
      <FormField name="Email:" value={email} onChange={setEmail} />
      <FormField name="Preferred pronouns:" value={pronouns}>
        <Select className="preferences__input" defaultValue={pronouns}>
          {Object.entries(PRONOUNS).map(([_key, value]) => (
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
        dispatch={(d) => daysFreeDispatch({ day: d as DAY, field: "include" })}
        options={DAYS_ARR.map((d) => ({
          name: d,
          toggled: Boolean(daysFreeToMeet?.[d].include),
        }))}
      />
      {daysFreeToMeet &&
        Object.entries(daysFreeToMeet)
          .filter(([_, value]) => value.include)
          .sort((a, b) => DAYS[a[0] as DAY] - DAYS[b[0] as DAY])
          .map(
            ([day, value]) =>
              value && (
                <div className="preferences__selectdays" key={day}>
                  <SelectField
                    name={`What times on ${day}?`}
                    options={TIMES_ARR.map((n, i) => ({
                      name: n,
                      toggled: (daysFreeToMeet as any)[day]["t" + i],
                    }))}
                    dispatch={(time) => {
                      const index = TIMES_ARR.indexOf(time);
                      daysFreeDispatch({ day, field: "t" + index } as any);
                    }}
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
