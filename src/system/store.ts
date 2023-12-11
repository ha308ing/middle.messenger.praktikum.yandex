import EventBus from "@/system/eventBus";
import setProp from "@/utils/setProp";

export enum StoreEvents {
  deactivateThread = "deactivateThread",
  updateUsers = "updateUsers",
  findUsers = "findUsers",
  gotThread = "gotThreads",

  update = "update",
  activateThread = "activateThread",
  clickThread = "clickThread",
  updateThread = "updateThread",
  connectWebSocket = "connectWebScoket",
  updateMessages = "updateMessages",
  sendMessageForm = "sendMessageForm",
}

export type State = {
  messages?: any;
  threads?: any;
  [key: string]: any;
};

const storeRoot = "store";

class Store extends EventBus {
  static _instance: Store;
  private _state: State = {};
  public events = StoreEvents;

  constructor() {
    super();
    if (Store._instance != null) {
      return Store._instance;
    }

    const localStore = window.localStorage.getItem(storeRoot);
    this._state = localStore != null ? JSON.parse(localStore) : {};

    Store._instance = this;
  }

  public get state(): State {
    return this._state;
  }

  public getState() {
    return this._state;
  }

  public clearState() {
    this._state = {};
    window.localStorage.removeItem(storeRoot);
  }

  public get(path: string): any {
    return path.split(".").reduce((obj, key) => {
      return obj?.[key];
    }, this.state);
  }

  public set(path: string, value: any) {
    setProp(this._state, path, value);
    for (const k in this.state) {
      window.localStorage.setItem(k, JSON.stringify(this._state[k]));
    }
    window.localStorage.setItem(storeRoot, JSON.stringify(this._state));

    if (this._events?.[StoreEvents.update] != null && this._events?.[StoreEvents.update].length > 0) {
      this.emit(StoreEvents.update);
    } else {
      console.warn("Store has tried to emit without handlers");
    }
  }
}

export default new Store();
