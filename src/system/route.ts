import { type ComponentClass } from "@/system/component";
import { renderDOMComponent } from "@/utils/renderDOM";

interface RouteProps {
  rootSelector: string;
  string?: unknown;
}

export class Route {
  public _componentClass: ComponentClass;
  public _pathname: string;
  public _props: RouteProps;
  public _rootSelector: RouteProps["rootSelector"];
  public _block: any;

  constructor(pathaname: string, componentClass: ComponentClass, props: RouteProps) {
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
      this._block.content.remove();
      this._block = null;
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (this._block == null) {
      this._block = new this._componentClass();
      renderDOMComponent(this._rootSelector, this._block);
      return;
    }
    renderDOMComponent(this._rootSelector, this._block);
  }
}
