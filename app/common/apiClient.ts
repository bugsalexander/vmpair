import axios from "axios";
import {
  PreferencesApiRequest,
  PreferencesApiResponse,
  StatsApiResponse,
  WelcomeApiRequest,
  WelcomeApiResponse,
} from "./types";

export const ROUTES = {
  WELCOME: "/api/v1/welcome",
  PREFERENCES: "/api/v1/preferences",
  STATS: "/api/v1/stats",
};

const baseURL = "http://localhost:5000";

const ApiClient = {
  getWelcome: () => axios.get<WelcomeApiResponse>(ROUTES.WELCOME, { baseURL }),
  getPreferences: () =>
    axios.get<PreferencesApiResponse>(ROUTES.PREFERENCES, { baseURL }),
  getStats: () => axios.get<StatsApiResponse>(ROUTES.STATS, { baseURL }),
  postWelcome: (payload: WelcomeApiRequest) =>
    axios.post(ROUTES.WELCOME, payload, { baseURL }),
  postPreferences: (payload: PreferencesApiRequest) =>
    axios.post(ROUTES.PREFERENCES, payload, { baseURL }),
};

export default ApiClient;
