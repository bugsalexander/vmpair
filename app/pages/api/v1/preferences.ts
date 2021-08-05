// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PreferencesApiResponse, WelcomeApiResponse } from "../../../common/types";

const sampleResponse: PreferencesApiResponse = {
  name: "Alex",
  preferredPronouns: "he/him/his",
  email: "<email here>",
  doesWantMatching: true,
  daysFreeToMeet: ["Monday", "Wednesday"],
  availabilityByDay: [
    {
      times: [
        new Date("Mon Aug 02 2021 12:00:00 GMT-0400 (Eastern Daylight Time)"),
        new Date("Mon Aug 02 2021 13:00:00 GMT-0400 (Eastern Daylight Time)"),
        new Date("Mon Aug 02 2021 14:00:00 GMT-0400 (Eastern Daylight Time)"),
      ],
      canVirtual: true,
      canInPerson: true,
    },
    {
      times: [
        new Date("Wed Aug 04 2021 11:00:00 GMT-0400 (Eastern Daylight Time)"),
        new Date("Wed Aug 04 2021 14:00:00 GMT-0400 (Eastern Daylight Time)"),
      ],
      canVirtual: true,
      canInPerson: false,
    },
  ],
  maxMeetingsPerWeek: 1,
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PreferencesApiResponse | undefined>
) {
  if (req.method === "POST") {
    return res.status(201).send(undefined);
  } else if (req.method === "GET") {
    return res.status(200).json(sampleResponse);
  }
  return res.status(405).send(undefined);
}
