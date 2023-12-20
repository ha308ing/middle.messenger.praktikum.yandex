type handler<T = any> = (...args: T[]) => void;

export default class EventBus {
  _events: Record<string, handler[]> = {};

  on(event: string, handler: handler): void {
    if (this._events?.[event] == null) this._events[event] = [];
    this._events[event] = this._events[event].concat(handler);
  }

  off(event: string, handler: handler): void {
    if (this._events?.[event] == null) throw new Error("EventBus: failed to off the handler, no such event");
    if (handler == null) {
      this._events[event] = [];
    } else {
      this._events[event] = this._events[event].filter(fn => fn !== handler);
    }
  }

  emit(event: string, ...args: unknown[]): void {
    if (this._events?.[event] == null) {
      throw new Error(`EventBus: failed to emit the event, no such event: ${event}`);
    }
    this._events[event].forEach(handler => {
      handler(...args);
    });
  }
}
