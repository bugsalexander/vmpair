import axios from "axios";
import {
  PreferencesApiRequest,
  PreferencesApiResponse,
  StatsApiResponse,
  WelcomeApiRequest,
  WelcomeApiResponse,
} from "./types";

export const ROUTES = {
  WELCOME: "/api/welcome",
  PREFERENCES: "/api/preferences",
  STATS: "/api/stats",
};

const ApiClient = {
  getWelcome: () => axios.get<WelcomeApiResponse>(ROUTES.WELCOME),
  getPreferences: () => axios.get<PreferencesApiResponse>(ROUTES.PREFERENCES),
  getStats: () => axios.get<StatsApiResponse>(ROUTES.STATS),
  postWelcome: (payload: WelcomeApiRequest) =>
    axios.post(ROUTES.WELCOME, payload),
  postPreferences: (payload: PreferencesApiRequest) =>
    axios.post(ROUTES.PREFERENCES, payload),
};

export default ApiClient;
