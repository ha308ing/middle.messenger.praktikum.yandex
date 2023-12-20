import isEqual from "@/utils/isEqual";
import store, { StoreEvents, type State } from "@/system/store";
import { type Indexed } from "@/types/types";
import type Component from "./component";

export default function storeConnector<
  K extends new (...props: any[]) => Component = typeof Component,
  T extends Indexed = Indexed,
>(mapFn: (state: State) => State & T) {
  return function (component: K): K {
    return class extends component {
      constructor(...props: any[]) {
        let state = mapFn(store.state);

        super({ ...props, ...state });

        store.on(StoreEvents.update, () => {
          const newState = mapFn(store.state);

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        });
      }
    };
  };
}
