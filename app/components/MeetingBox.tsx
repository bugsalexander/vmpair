import { differenceInDays } from "date-fns";
import { WelcomeApiResponse } from "../common/types";

type MeetingBoxProps = {
  meeting: WelcomeApiResponse["nextMeeting"] | undefined;
  nextPairing: Date | undefined;
};

export const MeetingBox: React.FC<MeetingBoxProps> = ({
  meeting,
  nextPairing,
  children,
}) => {
  // loading case
  if (!nextPairing) return null;

  // not scheduled or partner can't make it
  const partnerCanceled = meeting?.partnerStatus === "no";
  if (!meeting || partnerCanceled) {
    const date = new Date(nextPairing);
    const inDays = differenceInDays(new Date(), date);
    return (
      <div className="meetingbox">
        {partnerCanceled ? (
          <p>
            Your partner {meeting?.name} indicated they will not be able to make
            the meeting.
          </p>
        ) : (
          <p>Sorry, no meeting was able to be scheduled this week.</p>
        )}
        <p>
          Your next meeting will be scheduled in {inDays} days, on{" "}
          {date.toString()}.
        </p>
      </div>
    );
  }

  // otherwise display the meeting
  return (
    <div className="meetingbox">
      {meeting ? (
        <>
          <p>
            You are currently paired to meet with {meeting.name} on{" "}
            {new Date(meeting.date).toString()}
          </p>
          <div className="meetingbox__togglebox">
            <p>Will you be attending?</p>
            <div className="meetingbox__toggle">{children}</div>
          </div>
          <p className="meetingbox__nobottommargin">
            {meeting.name} has{" "}
            {meeting.partnerStatus === "yes"
              ? "accepted the meeting!"
              : "not yet indicated whether they will be able to make the meeting"}
          </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
