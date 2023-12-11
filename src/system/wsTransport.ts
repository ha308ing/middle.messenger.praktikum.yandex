import EventBus from "@/system/eventBus";

export enum WSEvents {
  openConnection = "openConnection",
  newMessage = "newMessage",
  errorConnection = "errorConnection",
  closeConnection = "closeConnection",
}

export default class WSTransport extends EventBus {
  events = WSEvents;

  public socket: WebSocket;
  protected readonly pingInterval;
  constructor(host: string, pingInterval = 30000) {
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

  getOld(lastMessageId: string) {
    this.socket.send(
      JSON.stringify({
        content: lastMessageId,
        type: "get old",
      })
    );
  }

  subscribe() {
    this.socket.addEventListener("open", () => {
      console.log("WSTransport: Connection has been established");
      this.emit(WSEvents.openConnection, "hello");
    });

    this.socket.addEventListener("close", event => {
      if (event.wasClean) {
        console.log("WSTransport: Connection was closed gracefully");
      } else {
        console.log("WSTransport: Connection was interrupted");
      }

      console.log(`Code: ${event.code} | Reason: ${event.reason}`);

      clearInterval(this.pingInterval);
    });

    this.socket.addEventListener("message", event => {
      const { type, ...message } = JSON.parse(event.data);
      if (type === "message") {
        console.log("WS got data:", message);
        this.emit(WSEvents.newMessage, { type, ...message });
      }
    });

    this.socket.addEventListener("error", event => {
      console.log("WSTransport Error:", (event as ErrorEvent).message);
      this.emit(WSEvents.errorConnection, (event as MessageEvent).data);
    });
  }
}