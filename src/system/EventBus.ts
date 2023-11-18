type handler<T = unknown, U = unknown> = (...args: T[]) => U;

export default class EvenBus {
  _events: Record<string, unknown[]> = {};

  on<T>(event: string, handler: handler<T>): void {
    if (this._events?.[event] == null) this._events[event] = [];
    this._events[event] = this._events[event].concat(handler);
  }

  off(event: string, handler: handler): void {
    if (this._events?.[event] == null) throw new Error("EventBus: failed to off the handler, no such event");
    this._events[event] = this._events[event].filter(fn => fn !== handler);
  }

  emit(event: string, ...args: unknown[]): void {
    if (this._events?.[event] == null) throw new Error("EventBus: failed to emit the event, no such event");
    this._events[event].forEach(handler => {
      (handler as handler)(...args);
    });
  }
}
