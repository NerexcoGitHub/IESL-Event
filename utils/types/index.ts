export type TicketType = "UNDERGRADUATE" | "ALUMNI" | "VIP";
export type PaymentStatus = "FULL_PAID" | "HALF_PAID" | "NOT_PAID"
export type AttendanceStatus = "NOT_ATTENDED" | "ATTENDED"
export interface TicketReqBody {
  _id: string;
  ticket_no: string;
  ticket_sold_by: string;
  name: string;
  table_no: string;

}

export type ResponseBody = {
  message: string;
  data?: any;
};

export type ResponseBodyGeneric<T> = {
  message: string;
  data?: T;
};

export type Alert = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};
