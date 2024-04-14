import { type BlockClass } from "@/system/block";
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

  use(pathname: string, component: BlockClass) {
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

  go(pathname: string, force = false) {
    if (window.location.pathname === pathname && !force) return;
    pathname = this._onRoute(pathname);
    this.history.pushState({}, "", pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  _isAuthorized() {
    return store.get("user")?.id != null;
  }

  start(path?: string) {
    window.onpopstate = <T extends Event = PopStateEvent>(event: T) => {
      const messengerPathname = "/messenger";
      const rootPathaname = "/";
      const target = event.currentTarget as Window;
      let { pathname } = target.location;
      if ((!this.restricted.includes(pathname) || pathname === rootPathaname) && this._isAuthorized()) {
        pathname = messengerPathname;
        window.location.pathname = messengerPathname;
        this._onRoute(pathname);
        return;
      }
      if (event.currentTarget == null) throw new Error("Router: popstate event - no event target");
      this._onRoute(pathname);
    };
    this._onRoute(path ?? window.location.pathname);
  }

  _onRoute(pathname: string) {
    if (!this._isAuthorized() && this.restricted.includes(pathname)) {
      this._onRoute("/sign-in");
      return "/sign-in";
    }
    console.log("not restricted");
    if (this.redirects[pathname] != null) {
      window.location.pathname = this.redirects[pathname];
      return pathname;
    }
    const route = this.routes[pathname];
    if (route == null) {
      if (this.routes["/404"] != null) this.go("/404");
      return "/404";
    }
    if (this._currentRoute != null) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
    return pathname;
  }
}

export default new Router("#app");
