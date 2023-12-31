// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { connect } from "../../../utils/db";
import { sendEmail } from "../../../utils/email/send";
import { ResponseBody } from "../../../utils/types";
import { authOptions } from "../auth/[...nextauth]";
import { nameConverter } from "../../../utils/commonFunction";

const { VERCEL_URL, NEXT_PUBLIC_CALLBACK_URL } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const { Ticket, QR } = await connect();
    if (req.method === "POST") {
      const { ticket_id } = req.body;

      const ticket = await Ticket.findOne({
        _id: ticket_id,
      });

      // if (ticket && !ticket.email_sent) {
      //   const qr = await QR.findOne({
      //     ticket_id: ticket.id,
      //   });

      //   if (qr) {
      //     const { email, name, id, phone_number, type } = ticket;
      //     const sib_email = await sendEmail({
      //       subject: "Your e-ticket for the Alogrhythm 2022",
      //       to: [{ email, name }],
      //       params: {
      //         type,
      //         email,
      //         name: nameConverter(name),
      //         phone_number,
      //         qr_url: qr.image_url,
      //         qr_data: Buffer.from(qr.data).toString("base64"),
      //       },
      //       attachment: [
      //         {
      //           name: "QR code.png",
      //           content: Buffer.from(qr.data).toString("base64"),
      //         },
      //       ],
      //     });

      //     if (sib_email) {
      //       const updateTicket = {
      //         ...ticket.toObject(),
      //         email_sent: true,
      //       };

      //       await Ticket.updateOne({ _id: ticket.id }, updateTicket);

      //       res.status(200).json({
      //         message: "Success",
      //         data: {
      //           sib_message_ids: sib_email.body,
      //         },
      //       });
      //     } else {
      //       res.status(400).json({
      //         message: "Error",
      //       });
      //     }
      //   } else {
      //     res.status(404).json({
      //       message: "Not Found",
      //     });
      //   }
      // } else {
      //   res.status(201).json({
      //     message: "Email sent already",
      //   });
      // }
    }
  } else {
    res.status(400).json({
      message: "Unauthorized",
    });
  }
}
