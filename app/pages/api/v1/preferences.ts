// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  PreferencesApiResponse,
  TIMES_ARR,
  WelcomeApiResponse,
} from "../../../common/types";

const sampleResponse: PreferencesApiResponse = {
  name: "Alex",
  preferredPronouns: "he/him/his",
  email: "<email here>",
  doesWantMatching: true,
  daysFreeToMeet: ["Monday", "Wednesday"],
  availabilityByDay: [
    {
      times: [TIMES_ARR[1], TIMES_ARR[2], TIMES_ARR[3]],
      canVirtual: true,
      canInPerson: true,
    },
    {
      times: [TIMES_ARR[0], TIMES_ARR[3]],
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
