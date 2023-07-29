// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";

import { connect, Ticket } from "../../../utils/db";
import { ResponseBody, TicketReqBody } from "../../../utils/types";
import { authOptions } from "../auth/[...nextauth]";

import { Model } from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {

  console.log("Request", req.body);
  const session = await unstable_getServerSession(req, res, authOptions);
    console.log("Session", session);

  // if (session) {
    if (req.method === "POST") {
      const { Ticket } = await connect();
      const reqData = req.body as TicketReqBody[];
      const reqDataPromiseArr = reqData.map((item) =>
        promiseHandler(item, Ticket)
      );
      const resolvedData = await Promise.allSettled(reqDataPromiseArr);
      const isAllFulfilled = resolvedData.every(
        (p) => p.status === "fulfilled"
      );

      if (isAllFulfilled) {
        res.status(200).json({ message: "Success", data: resolvedData });
      } else {
        res.status(401).json({ message: "Some Failed", data: resolvedData });
      }
    } else {
      res.status(404).json({ message: "Not Handled" });
    }
  // } else {
  //   console.log("Not authorized");
  //   res.status(400).json({
  //     message: "Unauthorized",
  //   });
  // }
}

const promiseHandler = async (
  item: any,
  Ticket: Model<any, {}, {}, {}, any>
) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const { ticket_no, ticket_sold_by, name, table_no } = item;
      const ticket = await Ticket.create({
        ticket_no,
        ticket_sold_by,
        name,
        table_no,
      });



      resolve(ticket);
    } catch (error) {
      console.log("Error", error);
      reject({ error, item });
    }
  });
};
