import isEqual from "@/utils/isEqual";
import store, { StoreEvents, type State } from "@/system/store";
import { type Indexed } from "@/types/types";
import type Component from "./component";

export default function storeConnector<
  K extends new (...props: any[]) => Component = typeof Component,
  T extends Indexed = Record<string, any>,
>(mapFn: (state: State) => State & T) {
  return function (component: K): K {
    return class extends component {
      constructor(...props: any[]) {
        // сохраняем начальное состояние
        let state = mapFn(store.state);

        super({ ...props, ...state });

        // подписываемся на событие
        store.on(StoreEvents.update, () => {
          // console.log("Store Connector emit updated event");
          // при обновлении получаем новое состояние
          const newState = mapFn(store.state);

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        });
      }
    };
  };
}
