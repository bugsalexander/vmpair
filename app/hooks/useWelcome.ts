import useSWR from "swr";
import ApiClient, { ROUTES } from "../common/apiClient";
import { WelcomeApiResponse } from "../common/types";

export const useWelcome = (): WelcomeApiResponse | undefined => {
  const { data } = useSWR(ROUTES.WELCOME, ApiClient.getWelcome);
  return data?.data;
};
