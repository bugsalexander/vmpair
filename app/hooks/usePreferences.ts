import useSWR from "swr";
import ApiClient, { ROUTES } from "../common/apiClient";
import { PreferencesApiResponse } from "../common/types";

export const usePreferences = (): PreferencesApiResponse | undefined => {
  const { data } = useSWR(ROUTES.PREFERENCES, ApiClient.getPreferences);
  return data?.data;
};
