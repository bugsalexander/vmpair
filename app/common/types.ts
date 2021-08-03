export type WelcomeApiRequest = {
  willBeAttending: boolean;
};

export type WelcomeApiResponse = {
  name: string;
  nextMeeting: {
    name: string;
    date: Date;
    partnerStatus: "yes" | "no" | "notYetIndicated";
  };
  nextPairing: Date;
};

export type PreferencesApiRequest = {
  name: string;
  preferredPronouns: string;
  email: string;
  doesWantMatching: boolean;
  daysFreeToMeet: string[];
  availabilityByDay: Array<{
    times: Date[];
    canVirtual: boolean;
    canInPerson: boolean;
  }>;
  maxMeetingsPerWeek: number;
};

export type PreferencesApiResponse = PreferencesApiRequest;

export type StatsApiResponse = {
  totalPeopleMet: number;
  totalMeetings: number;
  peopleMet: Array<{
    name: string;
    date: Date;
  }>;
};
