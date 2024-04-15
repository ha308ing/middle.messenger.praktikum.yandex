import { EventBus } from "@/system/eventBus";
import Handlebars from "handlebars";
import { v4 as makeUUID } from "uuid";
import { blockErrors } from "./errors";
import { blockEvents } from "./events";

type BlockChildren = Record<string, Block>;
type BlockEvents = Record<string, (...arg: any[]) => any>;
type BlockLists = Record<string, Array<Block | string>>;
type BlockProps = {
  __id?: string;
  events?: BlockEvents;
  [key: string]: any;
};

type Props<T extends Record<string, unknown> = Record<string, unknown>> = {
  settings: {
    withInternalId?: boolean;
  };
  children: BlockChildren;
  events: BlockEvents;
  [key: string]: any;
} & { [key in keyof T]: T[key] };

export type BlockClass<T extends Block = Block> = new (props?: Props) => T;

export class Block<T extends Record<string, unknown> = Record<string, unknown>> {
  static EVENTS = blockEvents;
  static ERRORS = blockErrors;

  public props: BlockProps;
  public children: BlockChildren;
  public events: BlockEvents;
  public lists: BlockLists;
  private readonly _tagName: string;
  private readonly _id?: string;
  private readonly _eventBus: () => EventBus;
  private _shouldUpdateFlag: boolean;
  private _element!: HTMLElement;

  constructor(tagName = "div", propsAndChildren: Partial<Props<T>> = {}) {
    const { children, props, events, lists } = this._getChildren(propsAndChildren);
    this.children = children;
    this.events = events;
    this.lists = lists;

    if (propsAndChildren.settings?.withInternalId != null) {
      this._id = makeUUID();
      this.props = this._makePropsProxy({ ...props, __id: this._id });
    } else {
      this.props = this._makePropsProxy(props);
    }

    this._tagName = tagName;

    const eventBus = new EventBus();
    this._eventBus = () => eventBus;

    this._shouldUpdateFlag = false;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    // document fragment children are read only
    // but we need some reference to be changed outside
    // here we create _element and change anywhere
    // so everywhere getContent() or .content
    // are used, get this reference
    this._element = this._createDocumentElement(this._tagName);
  }

  init() {
    this._createResources();
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();

    function childDispatchMount(child: unknown) {
      if (child instanceof Block) child.dispatchComponentDidMount();
    }

    Object.values(this.children).forEach(childDispatchMount);

    Object.values(this.lists).forEach(list => {
      list.forEach(childDispatchMount);
    });

    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // componentDidMount(oldProps) {}
  componentDidMount() {}

  dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  remove() {
    function removeBlock(block: unknown) {
      if (block instanceof Block) {
        block._removeEvents();
        block.remove();
      }
    }

    Object.values(this.children).forEach(removeBlock);

    Object.values(this.lists).forEach(list => {
      list.forEach(removeBlock);
    });

    this.element.remove();
  }

  _componentDidUpdate(oldProps: Props<T>, newProps: Props<T>) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(_oldProps: Props<T>, _newProps: Props<T>) {
    return true;
  }

  setProps = (nextProps: Partial<Props<T>>) => {
    if (nextProps == null) return;

    // deep assign
    Object.assign(this.props, nextProps);
    if (this._shouldUpdateFlag) this._eventBus().emit(Block.EVENTS.FLOW_CDU);
    this._shouldUpdateFlag = false;
  };

  get element() {
    return this._element;
  }

  _render() {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const block = this.render() as any;
    // if (!block) throw Error(Block.ERRORS.NO_USER_RENDER);
    // Это небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно компилировать не в строку (или делать это правильно),
    // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду

    // Удалить старые события через removeEventListener
    if (this.props.events != null && this.element != null)
      for (const [event, handler] of Object.entries(this.props.events)) {
        this._element.removeEventListener(event, handler);
      }

    this.element.innerHTML = "";
    if (block != null) this.element.append(block);

    if (this.props.settings?.withInternalId != null) {
      if (this._id == null) throw Error(Block.ERRORS.NO_ID);
      this._element?.setAttribute("data-id", this._id);
    }

    // Навесить новые события через addEventListener
    this._addEvents();
  }

  render() {}

  getContent() {
    return this._element;
  }

  _makePropsProxy(props: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, key) {
        const keyString = key.toString();
        const value = target[keyString];
        return typeof value === "function" ? value.bind(self) : value;
      },
      set(target, key, newValue) {
        const keyString = key.toString();
        const oldValue = target[keyString];
        target[keyString] = newValue;
        // deep compare
        self._shouldUpdateFlag ||= oldValue !== newValue;
        return true;
      },
      deleteProperty(_target, _p) {
        throw new Error("not allowed");
      },
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName);

    if (this.props.settings?.withInternalId != null) {
      if (this._id == null) throw Error(Block.ERRORS.NO_ID);
      element.setAttribute("data-id", this._id);
    }

    function setAttribute([name, value]: [string, string]) {
      const valueType = typeof value;
      const isValidValue =
        (valueType === "string" || valueType === "boolean" || valueType === "number") && !name.startsWith("_");
      if (isValidValue) element.setAttribute(name, value);
    }

    Object.entries(this.props).forEach(setAttribute);

    return element;
  }

  show() {
    if (this.element == null) return;

    this.element.style.display = "block";
  }

  hide() {
    if (this.element == null) return;

    this.element.style.display = "none";
  }

  _addEvents() {
    this._handleEvents(true);
  }

  _removeEvents() {
    this._handleEvents(false);
  }

  _getChildren(propsAndChildren: Partial<Props>) {
    const children: BlockChildren = {};
    const props: BlockProps = {};
    const events: BlockEvents = {};
    const lists: BlockLists = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      const isArray = Array.isArray(value);
      const valueType = typeof value;
      const isBlock = value instanceof Block;
      const isFunction = valueType === "function";

      if (isBlock) {
        children[key] = value;
      } else if (isArray) {
        lists[key] = value;
      } else if (isFunction) {
        events[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, events, lists };
  }

  compile(template: string, props: Partial<Props>) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="_list_${key}"></div>`;
    });

    /*
    Можно даже избавиться от this._element и возвращать первый элемент из DocumentFragment, чтобы вся структура компонента определялась внутри шаблона.
    */

    const fragment = document.createElement("template");

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);
    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub == null) return;
      stub.replaceWith(child._element);
    });

    Object.entries(this.lists).forEach(([key, list]) => {
      const stub = fragment.content.querySelector(`[data-id="_list_${key}"]`);
      if (stub == null) return;
      const listContent = document.createElement("template");
      list.forEach(listElement => {
        if (listElement instanceof Block) {
          listContent.content.append(listElement._element);
        } else if (typeof listElement === "number" || typeof listElement === "string") {
          // compile as handlebars template
          const compiledString = Handlebars.compile(listElement)(propsAndStubs);
          const template = document.createElement("template");
          template.innerHTML = compiledString;
          listContent.content.append(template.content);
        }
      });

      stub.replaceWith(listContent.content);
    });

    return fragment.content;
  }

  _isForbiddenProp(prop: string) {
    return prop.startsWith("_");
  }

  _isCaptureEvent(eventName: string) {
    return eventName.endsWith("_capture");
  }

  _getEventName(eventName: string) {
    const regExp = /^(.+)_capture$/;
    const match = regExp.exec(eventName);
    return match != null ? match[1] : eventName;
  }

  _handleEvents(addEvents: boolean) {
    Object.keys(this.events).forEach(eventName => {
      const eventNameWithoutCapture = this._getEventName(eventName);
      const isCaptureEvent = this._isCaptureEvent(eventName);
      if (addEvents) {
        this._element?.addEventListener(eventNameWithoutCapture, this.events[eventName], isCaptureEvent);
      } else {
        this._element?.removeEventListener(eventNameWithoutCapture, this.events[eventName], isCaptureEvent);
      }
    });
  }
}
