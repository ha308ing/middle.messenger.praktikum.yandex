import type { Block } from "@/system/block";
import { type BlockClass } from "@/system/block";
import { renderDOMBlock } from "@/utils/renderDOM";

interface RouteProps {
  rootSelector: string;
  string?: unknown;
}

export class Route {
  public _componentClass: BlockClass;
  public _pathname: string;
  public _props: RouteProps;
  public _rootSelector: RouteProps["rootSelector"];
  public _block: Block | null;

  constructor(pathaname: string, componentClass: BlockClass, props: RouteProps) {
    this._componentClass = componentClass;
    this._pathname = pathaname;
    this._props = props;
    this._rootSelector = props.rootSelector;
    this._block = null;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block != null) {
      this._block.remove();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (this._block == null) {
      this._block = new this._componentClass();
      renderDOMBlock(this._rootSelector, this._block);
      return;
    }
    renderDOMBlock(this._rootSelector, this._block);
  }
}
