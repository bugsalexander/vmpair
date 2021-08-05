import { Button, Checkbox, Select, Switch } from "antd";
import { Header } from "../components/Header";
import { FormField } from "../components/FormField";
import { SelectField } from "../components/SelectField";
import { useEffect, useReducer, useState } from "react";
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
export type DaysReducerState = {
  diff: boolean;
  mapping: Record<
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
};
type MappingFields = keyof DaysReducerState["mapping"][DAY];

function daysFreeReducer(
  state: DaysReducerState | null,
  payload: { day: DAY; field: MappingFields } | DaysReducerState | "save"
) {
  if (state === null) {
    return payload as DaysReducerState | null;
  }
  if (payload === "save") {
    return { ...state, diff: false };
  }
  const newMapping = { ...state.mapping };
  if ("day" in payload) {
    // make inner shallow copy
    newMapping[payload.day] = { ...state.mapping[payload.day] };
    newMapping[payload.day][payload.field] =
      !state.mapping[payload.day][payload.field];
    return { mapping: newMapping, diff: true };
  }
  return state;
}

function initializeDaysFreeReducerState(prefs: PreferencesApiResponse) {
  const mapping: DaysReducerState["mapping"] = {} as any;
  for (const [index, dayPref] of prefs.availabilityByDay.entries()) {
    const day = DAYS_ARR[index];
    const empty = dayPref.times.length === 0;
    mapping[day] = {
      include: !empty,
      // assume that order of daysFreeToMeet is same day order as availabilityByDay
      virtual: !empty && dayPref.canVirtual,
      inPerson: !empty && dayPref.canInPerson,
      t0: !empty && dayPref.times.includes(TIMES_ARR[0]),
      t1: !empty && dayPref.times.includes(TIMES_ARR[1]),
      t2: !empty && dayPref.times.includes(TIMES_ARR[2]),
      t3: !empty && dayPref.times.includes(TIMES_ARR[3]),
      t4: !empty && dayPref.times.includes(TIMES_ARR[4]),
    };
  }
  console.log(mapping);
  return { mapping, diff: false };
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
  const [diff, setDiff] = useState(false);
  const withSetDiff = (f: any) => (v: any) => {
    f(v);
    setDiff(true);
  };

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
      <FormField name="Name:" value={name} onChange={withSetDiff(setName)} />
      <FormField
        name="Email:"
        value={email}
        onChange={withSetDiff(setEmail)}
        disabled
      />
      <FormField name="Preferred pronouns:" value={pronouns}>
        <Select
          className="preferences__input"
          defaultValue={pronouns}
          value={pronouns}
          onChange={withSetDiff(setPronouns)}
        >
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
          onChange={withSetDiff(() => setDoesWantMatching((v) => !v))}
        />
      </FormField>
      <SelectField
        name="What days can you meet?"
        dispatch={(d) => daysFreeDispatch({ day: d as DAY, field: "include" })}
        options={DAYS_ARR.map((d) => ({
          name: d,
          toggled: Boolean(daysFreeToMeet?.mapping[d].include),
        }))}
      />
      {daysFreeToMeet &&
        Object.entries(daysFreeToMeet.mapping)
          .filter(([_, value]) => value.include)
          .sort((a, b) => DAYS[a[0] as DAY] - DAYS[b[0] as DAY])
          .map(([d, value]) => {
            const day = d as DAY;
            const mapping = daysFreeToMeet.mapping;
            const t = (i: number) => ("t" + i) as MappingFields;

            return (
              <div className="preferences__selectdays" key={day}>
                <SelectField
                  name={`What times on ${day}?`}
                  options={TIMES_ARR.map((n, i) => ({
                    name: n,
                    toggled: mapping[day][t(i)],
                  }))}
                  dispatch={(time) => {
                    const index = TIMES_ARR.indexOf(time);
                    daysFreeDispatch({ day, field: "t" + index } as any);
                  }}
                  className="preferences__selectdays__select"
                />
                <div className="preferences__selectdays__mode">
                  <Checkbox
                    checked={mapping[day].virtual}
                    onClick={() => daysFreeDispatch({ day, field: "virtual" })}
                  >
                    Virtual
                  </Checkbox>
                  <br />
                  <Checkbox
                    checked={mapping[day].inPerson}
                    onClick={() => daysFreeDispatch({ day, field: "inPerson" })}
                  >
                    In-person
                  </Checkbox>
                </div>
              </div>
            );
          })}
      <div className="preferences__buttonflex">
        <Button
          className="preferences__buttonflex__button"
          type="primary"
          disabled={!daysFreeToMeet?.diff && !diff}
          onClick={() => {
            daysFreeToMeet &&
              ApiClient.postPreferences({
                name,
                preferredPronouns: pronouns!,
                email,
                doesWantMatching,
                availabilityByDay: DAYS_ARR.map(
                  (day) => daysFreeToMeet.mapping[day]
                ).map((prefs) => {
                  const { inPerson, virtual, include } = prefs;
                  return {
                    canInPerson: include ? inPerson : false,
                    canVirtual: include ? virtual : false,
                    times: !include
                      ? []
                      : TIMES_ARR.flatMap((time, index) =>
                          (prefs as any)["t" + index] ? [time] : []
                        ),
                  };
                }),
                maxMeetingsPerWeek: 2,
              });

            daysFreeDispatch("save");
            setDiff(false);
          }}
        >
          Save my preferences
        </Button>
      </div>
    </>
  );
}
