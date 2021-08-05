import useSWR from "swr";
import ApiClient, { ROUTES } from "../common/apiClient";
import { StatsApiResponse } from "../common/types";

export const useStats = (): StatsApiResponse | undefined => {
  const { data } = useSWR(ROUTES.STATS, ApiClient.getStats);
  return data?.data;
};
