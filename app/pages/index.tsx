import useSWR from "swr";
import ApiClient, { ROUTES } from "../common/apiClient";
import { Header } from "../components/Header";

export default function Home() {
  const { data } = useSWR(ROUTES.WELCOME, ApiClient.getWelcome);

  return (
    <>
      <Header text={`Hey ${data?.data.name}! Welcome to VMpair`} />
    </>
  );
}
