import { Header } from "../components/Header";
import { useWelcome } from "../hooks/useWelcome";

export default function Home() {
  const data = useWelcome();

  return (
    <>
      <Header page="home" text={`Hey ${data?.name}! Welcome to VMpair`} />
    </>
  );
}
