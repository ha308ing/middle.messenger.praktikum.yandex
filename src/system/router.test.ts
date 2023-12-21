import { describe, expect, test, jest, afterEach } from "@jest/globals";
import router from "./router";
import store from "./store";

jest.mock("./store");

const renderMock = jest.fn();
const leaveMock = jest.fn();
const routeMock = {
  render: renderMock,
  leave: leaveMock,
};

Object.defineProperties(router, {
  routes: {
    value: {
      "/404": routeMock,
      "/sign-in": routeMock,
      "/sign-up": routeMock,
      "/messenger": routeMock,
    },
  },
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Router", () => {
  describe("calls correspondent methods", () => {
    test("go method triggers _onRoute method", () => {
      const spy = jest.spyOn(router, "_onRoute");

      router.go("/sign-up");

      expect(spy).toHaveBeenCalledWith("/sign-up");
    });

    test("page change triggers render method", () => {
      router.go("/sign-in");

      expect(renderMock).toBeCalled();
    });

    test("page change triggers leave method", () => {
      router.go("/sign-in");
      router.go("/sign-up");
      router.go("/sign-in");
      router.go("/sign-in");
      router.go("/sign-in");
      router.go("/sign-in");

      expect(leaveMock).toBeCalledTimes(2);
      expect(window.location.pathname).toBe("/sign-in");
    });
  });

  describe("should redirect", () => {
    test("allowed path should modify pathname", () => {
      router.go("/sign-up");

      expect(window.location.pathname).toBe("/sign-up");
    });

    test("unknown path should lead to 404", () => {
      const spy = jest.spyOn(router, "_onRoute");

      router.go("/unknown");

      expect(spy).lastCalledWith("/404");
      expect(window.location.pathname).toBe("/404");
    });

    test("navigation to the same path should be ignored", () => {
      const historyLength = window.history.length;
      const currentPath = window.location.pathname;

      router.go(currentPath);
      router.go(currentPath);
      router.go(currentPath);
      router.go(currentPath);
      router.go(currentPath);
      router.go("/messenger");

      expect(window.history.length).toBe(historyLength + 1);
    });

    test("unauthorized user should not have access to messenger page", () => {
      router.go("/messenger");

      expect(window.location.pathname).toBe("/sign-in");
      expect(window.location.pathname).not.toBe("/messenger");
    });

    test("authorized user should have access to messenger page", () => {
      (store as jest.MockedObject<typeof store>).get.mockReturnValue({ id: 25 });

      router.go("/messenger");

      expect(window.location.pathname).toBe("/messenger");
    });
  });

  describe("back/forward", () => {
    test("back method should call history API back", () => {
      const backSpy = jest.spyOn(window.history, "back");

      router.back();

      expect(backSpy).toBeCalled();
    });

    test("back method should navigate to the previous page", () => {
      router.go("/sign-in");
      router.go("/sign-up");
      router.back();

      expect(window.location.pathname).toBe("/sign-up");
    });

    test("forward method should navigate to the next page", () => {
      const spy = jest.spyOn(router, "go");

      router.go("/sign-in");
      router.go("/sign-up");
      router.back();
      router.forward();

      expect(spy).lastCalledWith("/sign-up");
      expect(window.location.pathname).toBe("/sign-up");
    });
  });
});
