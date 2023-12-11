import Handlebars from "handlebars";
import EventBus from "@/system/eventBus";
import { v4 as uuid } from "uuid";
import isPlainObject from "@/utils/isPlainObject";

type Prop<T> = Record<string | symbol, T>;
export type Props = Prop<any>;
type PropsComponents = Prop<Component>;
type PropsEvents = Prop<(args: any) => any>;
type PropsLists = Prop<any[]>;

export type ComponentClass<T extends Component = Component> = new (props?: Props, persistClass?: string) => T;

type FilteredProps = {
  propsGroup?: {
    components?: PropsComponents;
    events?: PropsEvents;
    lists?: PropsLists;
  };
};

export default class Component<T extends Record<string, any> = Props> {
  static EVENTS = {
    INIT: "component-init",
    CDM: "component-did-mount",
    CDU: "component-did-update",
    RENDER: "component-render",
  };

  public readonly _persistClass: string = "";
  public readonly _tag: string;
  public readonly _eventBus: EventBus;
  public _propsUpdateFlag = false;
  public readonly _props: Props;
  public readonly _propsComponents: PropsComponents;
  public _propsEvents: PropsEvents;
  public readonly _currentEvents: PropsEvents;
  public readonly _propsLists: PropsLists;
  public readonly _element: HTMLElement;
  public readonly _templ: string | null;
  public readonly _id = uuid();

  constructor(tag = "div", props?: T, persistClass = "") {
    this._eventBus = new EventBus();
    this._tag = tag;
    const { propsGroup } = this.filterProps(props);

    this._currentEvents = propsGroup?.events != null ? { ...propsGroup.events } : {};

    this._props = this.makePropsProxy<Props>({ ...props, _id: this._id });
    this._propsComponents = this.makePropsProxy<PropsComponents>(
      propsGroup?.components != null ? { ...propsGroup.components } : {}
    );
    this._propsEvents = this.makePropsProxy<PropsEvents>(propsGroup?.events != null ? { ...propsGroup.events } : {});
    this._propsLists = this.makePropsProxy<PropsLists>(propsGroup?.lists != null ? { ...propsGroup.lists } : {});
    this._persistClass = persistClass;

    this._templ = this._setTemplate();

    this.registerEvents();
    this._element = document.createElement(this._tag);
    this._eventBus.emit(Component.EVENTS.INIT);
  }

  registerEvents() {
    this._eventBus.on(Component.EVENTS.INIT, this._init.bind(this));
    this._eventBus.on(Component.EVENTS.CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Component.EVENTS.CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Component.EVENTS.RENDER, this._render.bind(this));
  }

  _init() {
    this._eventBus.emit(Component.EVENTS.RENDER);
  }

  componentDidMount() {}

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this._propsComponents).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(Component.EVENTS.CDM);
    if (Object.keys(this._propsComponents).length > 0) {
      this._eventBus.emit(Component.EVENTS.RENDER);
    }
  }

  componentDidUpdate(oldValue: Props, newValue: Props): boolean {
    function compareObj(obj1: Props, obj2: Props) {
      // return true
      const entries1 = Object.entries(obj1);
      const entries2 = Object.entries(obj1);
      if (entries1.length !== entries2.length) return true;
      /* eslint prefer-const: off */
      for (let key in obj1) {
        if (obj1[key] instanceof Component) {
          if (!(obj2[key] instanceof Component)) return true;
          compareObj((obj1[key] as Component)._props, (obj2[key] as Component)._props);
        }
        if (obj1[key] !== obj2[key]) return true;
      }
      return false;
    }

    return compareObj(oldValue, newValue);
  }

  _componentDidUpdate(oldValue: Props, newValue: Props) {
    const isRerender = this.componentDidUpdate(oldValue, newValue);
    if (isRerender) this._eventBus.emit(Component.EVENTS.RENDER);
  }

  compile(templateString: string, props?: Props) {
    if (typeof props === "undefined") props = this._props;

    const _props = { ...props };

    Object.entries(this._propsComponents).forEach(([key, child]) => {
      _props[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this._propsLists).forEach(([key]) => {
      _props[key] = `<div data-id="_list_${key}"></div>`;
    });

    const handlebarsCompileOptions = {};
    const componentTemplateContainer = document.createElement("template");
    const componentHTML = Handlebars.compile(templateString, handlebarsCompileOptions)(_props);
    componentTemplateContainer.innerHTML = componentHTML;
    Object.values(this._propsComponents).forEach(child => {
      const childToReplace = componentTemplateContainer.content.querySelector(`[data-id="${child._id}"]`);

      if (childToReplace != null) {
        childToReplace.replaceWith(child.content);
      }
    });

    Object.entries(this._propsLists).forEach(([key, list]) => {
      const childToReplace = componentTemplateContainer.content.querySelector(`[data-id="_list_${key}"]`);
      if (childToReplace == null) return;
      const listContent = this.createDocumentElement("template") as HTMLTemplateElement;
      list.forEach(listItem => {
        if (listItem instanceof Component) {
          listContent.content.append(listItem.content);
        } else if (typeof listItem === "string") {
          const compiledString = Handlebars.compile(listItem, handlebarsCompileOptions)(_props);
          const template = this.createDocumentElement("template") as HTMLTemplateElement;
          template.innerHTML = compiledString;
          listContent.content.append(template.content);
        }
      });
      childToReplace.replaceWith(listContent.content);
    });

    return componentTemplateContainer.content;
  }

  render() {}

  protected _setTemplate(): string | null {
    return null;
  }

  _render() {
    this.removeEvents();
    this.removeAttributes();
    this._element.innerHTML = "";
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const block = this.render();
    if (block != null) {
      this._element.append(block);
    } else if (this._templ != null) {
      const element = this.compile(this._templ, this._props);
      this._element.append(element);
    } else {
      throw new Error("component render: nor render nor template");
    }
    this.setAttributes();
    this.addEvents();
  }

  get content() {
    return this._element;
  }

  public setProps(newProps: T) {
    if (newProps == null) return;

    this._propsUpdateFlag = false;
    const currentProps = { ...this._props };
    Object.assign(this._props, newProps);

    const { propsGroup } = this.filterProps(newProps);
    const propsComponents = propsGroup?.components != null ? { ...propsGroup.components } : {};
    const propsEvents = propsGroup?.events != null ? { ...propsGroup.events } : {};
    const propsLists = propsGroup?.lists != null ? { ...propsGroup.lists } : {};

    if (Object.entries(propsComponents).length > 0) {
      Object.assign(this._propsComponents, propsComponents);
    }
    if (Object.entries(propsEvents).length > 0) {
      this.removeEvents();
      this._propsEvents = propsEvents;
    }
    if (Object.entries(propsLists).length > 0) {
      Object.assign(this._propsLists, propsLists);
    }

    if (this._propsUpdateFlag) {
      this._eventBus.emit(Component.EVENTS.CDU, currentProps, newProps);
      this._propsUpdateFlag = false;
    }
  }

  createDocumentElement(tag: string) {
    const element = document.createElement(tag);
    return element;
  }

  makePropsProxy<T extends Props>(props: T) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop];
        if (typeof value === "function") return value.bind(target);
        return value;
      },

      set: (target: Props, prop, value) => {
        if (target[prop] !== value) {
          target[prop] = value;
          this._propsUpdateFlag = true;
        }
        return true;
      },
    });
  }

  _identifyProp(key: string, value: unknown) {
    const valueType = typeof value;
    const isArrayOfObjects = (array: any[]) => isPlainObject(array[0]);
    if (value === undefined) return null;
    if (valueType === "boolean") return "bool";
    if ((valueType === "string" || valueType === "number") && key.startsWith("data-")) return "data";
    if (valueType === "string" || valueType === "number") return "string";
    if (Array.isArray(value) && !isArrayOfObjects(value)) return "list";
    if (value instanceof Component) return "component";
    if (valueType === "function") return "event";
    return null;
  }

  filterProps(props?: T): FilteredProps {
    // debugger<T extends Record<string,T>>
    let propsGroup: FilteredProps["propsGroup"];
    const propsRaw: Props = {};
    const components: PropsComponents = {};
    const lists: PropsLists = {};
    const events: PropsEvents = {};

    Object.entries(props as Props).forEach(([key, value]) => {
      const propType = this._identifyProp(key, value);
      if (value == null) return;
      switch (propType) {
        case "component": {
          components[key] = value as Component;
          break;
        }
        case "event": {
          events[key] = (value as (args: unknown) => unknown).bind(this);
          break;
        }
        case "list": {
          lists[key] = value as unknown[];
          break;
        }
        default:
          break;
      }
      propsRaw[key] = value;
    });
    propsGroup = {
      components,
      events,
      lists,
    };
    return { propsGroup };
  }

  setAttributes() {
    Object.entries(this._props).forEach(([attribute, value]) => {
      const propIsAttribute =
        attribute in this._element || attribute === "class" || attribute === "id" || attribute.startsWith("data-");
      const attributeIsText = typeof value === "string" || typeof value === "number" || typeof value === "boolean";
      if (propIsAttribute && attributeIsText)
        if (value != null) {
          this._element.setAttribute(attribute, value.toString());
          if (value === false) this._element.removeAttribute(attribute);
        } else {
          this._element.removeAttribute(attribute);
        }
    });
    if (this._persistClass !== "")
      this._element.classList.add(
        ...this._persistClass
          .trim()
          .replaceAll(/\s{2,}/g, " ")
          .split(" ")
      );
  }

  addEvents() {
    const captureRegexp = /^(\w+)_capture/;
    Object.keys(this._currentEvents).forEach(eventName => {
      let event = eventName;
      let useCapture = false;
      let match = eventName.match(captureRegexp);
      if (match !== null) {
        event = match[1];
        useCapture = true;
      }
      // ! must be _currentEvents this._element.addEventListener(event, this._currentEvents[eventName], useCapture);
      this._element.addEventListener(event, this._currentEvents[eventName], useCapture);
    });
  }

  removeAttributes() {
    let a = this._element.attributes[0];
    while (this._element.attributes[0] != null) {
      this._element.removeAttribute(a.name);
      a = this._element.attributes[0];
    }
  }

  removeEvents() {
    const captureRegexp = /^(\w+)_capture/;
    /*     Object.keys(this._propsEvents).forEach(eventName => {
      let event = eventName;
      let useCapture = false;
      let match = eventName.match(captureRegexp);
      if (match !== null) {
        event = match[1];
        useCapture = true;
      }
      // this._element.removeEventListener(event, this._currentEvents[eventName], useCapture);
      this._element.removeEventListener(event, this._propsEvents[eventName], useCapture);
    }); */
    Object.keys(this._currentEvents).forEach(eventName => {
      let event = eventName;
      let useCapture = false;
      let match = eventName.match(captureRegexp);
      if (match !== null) {
        event = match[1];
        useCapture = true;
      }
      // this._element.removeEventListener(event, this._currentEvents[eventName], useCapture);
      this._element.removeEventListener(event, this._currentEvents[eventName], useCapture);
    });
  }
}
