import { Header } from "../components/Header";
import { useWelcome } from "../hooks/useWelcome";
import { MeetingBox } from "../components/MeetingBox";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";
import ApiClient from "../common/apiClient";
import { WelcomeApiResponse } from "../common/types";

export default function Home() {
  const [data, setData] = useState<WelcomeApiResponse | null>(null);
  const [canAttend, setCanAttend] = useState(true);

  useEffect(() => {
    ApiClient.getWelcome().then((req) => {
      setData(req.data);
      setCanAttend(!!req.data.willBeAttending);
    });
  }, []);

  return (
    <>
      <Header page="home" text={`${data?.name}'s Dashboard`} />
      <MeetingBox meeting={data?.nextMeeting} nextPairing={data?.nextPairing}>
        <Switch
          checked={canAttend}
          onChange={() => {
            setCanAttend(!canAttend);
            ApiClient.postWelcome({ willBeAttending: !canAttend });
          }}
        />
      </MeetingBox>
      <div className="index__bottomlinks">
        To change your scheduled meeting frequency,{" "}
        <Link href="/preferences" passHref>
          <div className="index__link">update your preferences</div>
        </Link>
        .
      </div>
      <div className="index__bottomlinks">
        <Link href="/statistics" passHref>
          <div className="index__link">View my pairing stats</div>
        </Link>
      </div>
    </>
  );
}
