import { HTTPTransport } from "@/system/httpTransport";
const hostDefault = "https://ya-praktikum.tech/api/v2";

export class BaseAPI {
  protected transporter: HTTPTransport;

  constructor(host = hostDefault) {
    this.transporter = new HTTPTransport(host, { withCredentials: true });
  }
}
