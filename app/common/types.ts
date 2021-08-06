export type WelcomeApiRequest = {
  willBeAttending: boolean;
};

export type WelcomeApiResponse = {
  name: string;
  nextMeeting: {
    partnerName: string;
    time: string;
    partnerStatus: number;
  };
  nextPairing: number;
  willBeAttending: boolean;
};

export type PreferencesApiRequest = {
  name: string;
  preferredPronouns: string;
  email: string;
  doesWantMatching: boolean;
  availabilityByDay: Array<{
    times: string[];
    canVirtual: boolean;
    canInPerson: boolean;
  }>;
  maxMeetingsPerWeek: number;
};

export type PreferencesApiResponse = PreferencesApiRequest;

export type StatsApiResponse = {
  totalPeopleMet: number;
  totalMeetings: number;
  peopleMet: Record<string, string>;
};

export const PRONOUNS = {
  HE: "he/him/his",
  SHE: "she/her/hers",
  THEY: "they/them/theirs",
} as const;
export type PronounValue = typeof PRONOUNS[keyof typeof PRONOUNS];

export const DAYS = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
} as const;
export type DAY = keyof typeof DAYS;
export const DAYS_ARR = Object.entries(DAYS)
  .sort((a, b) => a[1] - b[1])
  .map((a) => a[0]) as DAY[];

export const TIMES = {
  "11am": 0,
  "12pm": 1,
  "1pm": 2,
  "2pm": 3,
  "3pm": 4,
} as const;
export type TIME = keyof typeof TIMES;
export const TIMES_ARR: string[] = Object.entries(TIMES)
  .sort((a, b) => a[1] - b[1])
  .map((a) => a[0]) as TIME[];

export const MAX_MEETINGS = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5
} as const;
export type MaxMeetings = typeof MAX_MEETINGS[keyof typeof MAX_MEETINGS];