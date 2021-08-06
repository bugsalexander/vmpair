type MeetingsProps = {
  meetings: Array<{
    name: string;
    date: Date;
  }>;
};

export const Meetings: React.FC<MeetingsProps> = ({ meetings }) => {
  console.log(meetings);
  return (
    <div className="statistics__flex">
      <div className="statistics__inline">
        {!meetings || meetings.length === 0 ? (
          <div className="statistics__entry">N/A</div>
        ) : (
          meetings.map((meeting) => (
            <div key={meeting.date.toString()} className="statistics__entry">
              {meeting.name}
            </div>
          ))
        )}
      </div>
      <div className="statistics__inline">
        {meetings.map((meeting) => (
          <div key={meeting.date.toString()} className="statistics__entry">
            {meeting.date}
          </div>
        ))}
      </div>
    </div>
  );
};
