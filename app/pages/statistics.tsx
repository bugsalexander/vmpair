import { Header } from "../components/Header";
import { NumberStat } from "../components/NumberStat";
import { Meetings } from "../components/Meetings";
import { useStats } from "../hooks/useStats";

export default function Home() {
  const data = useStats();
  return (
    <>
      <Header page="statistics" text={`Your stats:`} />
      <NumberStat label="Number of people met: " value={data?.totalPeopleMet}/>
      <NumberStat label="Recent meetings: "/>
      <div className="statistics__flex">
        <div className="statistics__inline">
          {data?.peopleMet.map((meeting) =>
            <div className="statistics__entry">{meeting.name}</div>
          )}
        </div>
        <div className="statistics__inline">
          {data?.peopleMet.map((meeting) =>
            <div className="statistics__entry">{meeting.date}</div>
          )}
        </div>
      </div>
      <NumberStat label="Total meetings: " value={data?.totalMeetings}/>
    </>
  );
}