import { describe, test, expect, jest, afterEach, beforeEach } from "@jest/globals";
import { HTTPTransport } from "@/system/httpTransport";

let http = new HTTPTransport("", {});
let spyRequest = jest.spyOn(http, "request");

enum METHOD {
  GET = "GET",
}

const open = jest.fn();
const onload = jest.fn(x => x);
const onerror = jest.fn();
const send = jest.fn(x => x);
const setRequestHeader = jest.fn((header: string, value) => ({ [header]: value }));

// @ts-expect-error mock part of xmlhttprequest
global.XMLHttpRequest = jest.fn().mockImplementation(function () {
  return {
    open,
    send,
    onerror,
    onload,
    setRequestHeader,
  };
});

beforeEach(() => {
  http = new HTTPTransport("", {});
  spyRequest = jest.spyOn(http, "request");
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("HTTPTransport", () => {
  test("request should set xhr url", () => {
    http.request("/url", { method: METHOD.GET });

    expect(open.mock.calls[0][1]).toBe("/url");
  });

  test("requestWithRetry retries on reject specified number of times", async () => {
    spyRequest.mockRejectedValue("rejected");

    try {
      await http.requestWithRetry("", { method: METHOD.GET }, 3);
    } catch {}

    expect(spyRequest).toBeCalledTimes(3);
  });

  describe("preconfigured methods", () => {
    test("get: adds input data to the url query", () => {
      http.get("", { data: { a: 1, b: 2 } });

      expect(open).toHaveBeenCalledWith("GET", "?a=1&b=2");
    });

    test("post: set xhr headers", () => {
      http.post("", { headers: { "Content-Type": "application/json" } });

      expect(setRequestHeader).lastReturnedWith({ "Content-Type": "application/json" });
    });

    test("put: sets xhr timeout", () => {
      http.put("", { withCredentials: true, timeout: 500 });

      expect(spyRequest.mock.calls[0][1].timeout).toBe(500);
    });

    test("delete: opens connection with delete method", () => {
      http.delete("", {});

      expect(open).toHaveBeenCalledWith("DELETE", "");
    });
  });
});
