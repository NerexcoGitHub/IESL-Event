//IMPORT MONGOOSE
import { Document, Schema, Types } from "mongoose";
import { AttendanceStatus, PaymentStatus, TicketType } from "../../types";

type Ticket = {
  _id: string;
  ticket_no: string;
  ticket_sold_by: string;
  name: string;
  table_no: string;
};

type TicketMongoDoc = Ticket & Document;

const TicketSchema = new Schema<TicketMongoDoc>({
  name: {
    type: String,
    required: true,
  },
  ticket_no: {
    type: String,
    required: true,
    unique: true,
  },
  ticket_sold_by: {
    type: String,
    required: false,
  },

  table_no: {
    type: String,
    required: false,
  },
});

export { TicketSchema };
export type { Ticket };
