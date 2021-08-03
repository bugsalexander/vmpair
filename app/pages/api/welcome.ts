// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { WelcomeApiResponse } from "../../common/types";

const sampleResponse: WelcomeApiResponse = {
  name: "Alex",
  nextMeeting: {
    date: new Date(),
    name: "Hannah",
    partnerStatus: "notYetIndicated",
  },
  nextPairing: new Date(2021, 8, 25, 12, 0),
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WelcomeApiResponse | undefined>
) {
  if (req.method === "POST") {
    return res.status(201).send(undefined);
  } else if (req.method === "GET") {
    return res.status(200).json(sampleResponse);
  }
  return res.status(405).send(undefined);
}
