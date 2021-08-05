import { NextApiRequest, NextApiResponse } from "next";
import { StatsApiResponse } from "../../../common/types";

const data: StatsApiResponse = {
  peopleMet: [
    {
      date: new Date(
        "Tue Aug 03 2021 12:00:00 GMT-0400 (Eastern Daylight Time)"
      ),
      name: "Joey Rose",
    },
    {
      date: new Date(
        "Mon Aug 02 2021 12:00:00 GMT-0400 (Eastern Daylight Time)"
      ),
      name: "Hannah Fan",
    },
  ],
  totalMeetings: 2,
  totalPeopleMet: 2,
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatsApiResponse | undefined>
) {
  if (req.method === "GET") {
    return res.status(200).json(data);
  }
  return res.status(405).send(undefined);
}
