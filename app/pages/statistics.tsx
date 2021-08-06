import { Header } from "../components/Header";
import { NumberStat } from "../components/NumberStat";
import { Fragment } from "react";
import { useStats } from "../hooks/useStats";

export default function Home() {
  const data = useStats();
  const entries = !data ? [] : Object.entries(data!.peopleMet);
  console.log(data, entries);
  return (
    <>
      <Header page="statistics" text={`Your stats:`} />
      <NumberStat label="Number of people met: " value={data?.totalPeopleMet} />
      <NumberStat
        label="Recent meetings: "
        value={(data && entries.length !== 0 ? "" : "N/A") as any}
      />
      <div className="statistics__flex">
        {!data || entries.length === 0
          ? null
          : Object.entries(data.peopleMet).map(([name, date]) => {
              return (
                <Fragment key={date}>
                  <div className="statistics__inline">
                    <div key={name} className="statistics__entry">
                      {name}
                    </div>
                  </div>
                  <div className="statistics__inline">
                    <div key={date} className="statistics__entry">
                      {date}
                    </div>
                  </div>
                </Fragment>
              );
            })}
      </div>
      <NumberStat label="Total meetings: " value={data?.totalMeetings} />
    </>
  );
}
