import { Header } from "../components/Header";
import { useWelcome } from "../hooks/useWelcome";
import { MeetingBox } from "../components/MeetingBox";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const data = useWelcome();
  const [canAttend, setCanAttend] = useState("");

  useEffect(() => {
    setCanAttend(data?.willBeAttending!);
    console.log("setting can attend to", data?.willBeAttending);
  }, [data?.willBeAttending]);

  return (
    <>
      <Header page="home" text={`Hey ${data?.name}! Welcome to VMpair`} />
      <MeetingBox meeting={data?.nextMeeting} nextPairing={data?.nextPairing}>
        <Switch />
      </MeetingBox>
      <p>
        To change your scheduled meeting frequency,{" "}
        <Link href="/preferences" passHref>
          <div className="index__link">update your preferences</div>
        </Link>
        .
      </p>
      <p>
        <Link href="/statistics" passHref>
          <div className="index__link">View my pairing stats</div>
        </Link>
      </p>
    </>
  );
}
