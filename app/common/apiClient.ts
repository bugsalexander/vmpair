import axios from "axios";
import {
  PreferencesApiRequest,
  PreferencesApiResponse,
  StatsApiResponse,
  WelcomeApiRequest,
  WelcomeApiResponse,
} from "./types";

export const ROUTES = {
  LOGIN: "/api/v1/login",
  WELCOME: "/api/v1/welcome",
  PREFERENCES: "/api/v1/preferences",
  STATS: "/api/v1/stats",
};

const baseURL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

const ApiClient = {
  getWelcome: () => axios.get<WelcomeApiResponse>(ROUTES.WELCOME, { baseURL }),
  getPreferences: async () => {
    const response = await axios.get<PreferencesApiResponse>(
      ROUTES.PREFERENCES,
      { baseURL }
    );
    for (const d of response.data.availabilityByDay) {
      if (typeof d.times === "string") {
        d.times = (d.times as string).split(",").map((s) => s.trim());
      }
    }
    return response;
  },
  getStats: () => axios.get<StatsApiResponse>(ROUTES.STATS, { baseURL }),
  postWelcome: (payload: WelcomeApiRequest) =>
    axios.post(ROUTES.WELCOME, payload, { baseURL }),
  postPreferences: (payload: PreferencesApiRequest) =>
    axios.post(ROUTES.PREFERENCES, payload, { baseURL }),
  login: (email: string) => axios.post(ROUTES.LOGIN, { email }, { baseURL }),
};

export default ApiClient;
