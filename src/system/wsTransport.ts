import { EventBus } from "@/system/eventBus";

export enum WSEvents {
  openConnection = "openConnection",
  newMessage = "newMessage",
  errorConnection = "errorConnection",
  closeConnection = "closeConnection",
}

export class WSTransport extends EventBus {
  events = WSEvents;

  public socket: WebSocket;
  protected readonly pingInterval;
  constructor(host: string, pingInterval = 20000) {
    super();
    // this.host = host
    this.socket = new WebSocket(host);

    this.pingInterval = setInterval(() => {
      this.ping();
    }, pingInterval);

    this.subscribe();
  }

  send(content: string, type = "message") {
    this.socket.send(
      JSON.stringify({
        content,
        type,
      })
    );
  }

  close() {
    this.socket.close();
    clearInterval(this.pingInterval);
  }

  ping() {
    this.send("ping", "ping");
  }

  getOld(lastMessageId = 0) {
    this.socket.send(
      JSON.stringify({
        content: lastMessageId,
        type: "get old",
      })
    );
  }

  subscribe() {
    this.socket.addEventListener("open", () => {
      this.emit(WSEvents.openConnection);
    });

    this.socket.addEventListener("close", event => {
      if (event.wasClean) {
        console.log("WSTransport: Connection was closed");
      } else {
        console.log("WSTransport: Connection was interrupted");
      }

      console.log(`Code: ${event.code} | Reason: ${event.reason}`);

      clearInterval(this.pingInterval);
    });

    this.socket.addEventListener("message", event => {
      const dataParsed = JSON.parse(event.data);
      let newMessages = [];
      const irrelevantMessage = dataParsed?.type === "pong" || dataParsed?.type === "user connected";
      if (!irrelevantMessage && dataParsed != null) {
        if (Array.isArray(dataParsed)) {
          newMessages = dataParsed.reverse();
        } else if (!Array.isArray(dataParsed)) {
          newMessages.push(dataParsed);
        }
        this.emit(WSEvents.newMessage, newMessages);
      }
    });

    this.socket.addEventListener("error", event => {
      console.log("WSTransport Error:", (event as ErrorEvent).message);
      this.emit(WSEvents.errorConnection, (event as MessageEvent).data);
    });
  }
}
