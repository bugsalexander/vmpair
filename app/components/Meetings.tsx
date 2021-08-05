type MeetingsProps = {
  meetings: Array<{
    name: string;
    date: Date;
  }>
};

export const Meetings: React.FC<MeetingsProps> = ({
  meetings
}) => {
  return (
    <div className="statistics__flex">
      <div className="statistics__inline">
        {meetings.map((meeting) =>
          <div className="statistics__entry">{meeting.name}</div>
        )}
      </div>
      <div className="statistics__inline">
        {meetings.map((meeting) =>
          <div className="statistics__entry">{meeting.date}</div>
        )}
      </div>
    </div>
  );
};
