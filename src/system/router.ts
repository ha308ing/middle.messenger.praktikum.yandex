import { type ComponentClass } from "@/system/component";
import { Route } from "@/system/route";
import store from "./store";

type Routes = Record<string, Route>;

class Router {
  static _instance: Router;
  public history = window.history;
  public routes: Routes = {};
  public redirects: Record<string, string> = {};
  public _rootSelector: string = "";
  private _currentRoute: Route | null = null;
  restricted = ["/messenger", "/settings", "/thread-manage"];
  allowed = ["/sign-in", "/sign-up"];
  constructor(rootSelector?: string) {
    if (Router._instance != null) {
      return Router._instance;
    }

    Router._instance = this;

    if (rootSelector == null) throw new Error("Router: no root selector");
    this._rootSelector = rootSelector;
  }

  use(pathname: string, component: ComponentClass) {
    const route = new Route(pathname, component, { rootSelector: this._rootSelector });
    this.routes = { ...this.routes, [pathname]: route };
    return this;
  }

  redirect(from: string, to: string) {
    this.redirects = { ...this.redirects, [from]: to };
    return this;
  }

  clearRedirects() {
    this.redirects = {};
    return this;
  }

  go(pathname: string) {
    if (window.location.pathname === pathname) return;
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  start(path?: string) {
    window.onpopstate = <T extends Event = PopStateEvent>(event: T) => {
      if (event.currentTarget == null) throw new Error("Router: popstate event - no event target");
      this._onRoute((event.currentTarget as Window).location.pathname);
    };
    // .bind(this);
    this._onRoute(path ?? window.location.pathname);
  }

  _onRoute(pathname: string) {
    if (store.get("user")?.id == null && this.restricted.includes(pathname)) {
      this._onRoute("/sign-in");
      return;
    }
    if (store.get("user")?.id != null && this.allowed.includes(pathname)) {
      this._onRoute("/messenger");
      return;
    }
    console.log("not restricted");
    if (this.redirects[pathname] != null) {
      window.location.pathname = this.redirects[pathname];
      return;
    }
    console.log("onroute", window.location.pathname);
    const route = this.routes[pathname];
    if (route == null) {
      if (this.routes["/404"] != null) this.go("/404");
      return;
    }
    if (this._currentRoute != null) {
      // this._currentRoute._block.content.remove()
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }
}

export default new Router("#app");
