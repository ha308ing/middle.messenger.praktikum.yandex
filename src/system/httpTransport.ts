enum METHOD {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

type Headers = {
  "Content-Type": "application/json" | "application/text";
};

type Options = {
  method: METHOD;
  data?: any;
  timeout?: number;
  headers?: Headers;
  retries?: number;
  withCredentials?: boolean;
};

type OptionsWithoutMethod = Omit<Options, "method">;

export default class HTTPTransport {
  public host: string;
  public defaultOptions: OptionsWithoutMethod;
  constructor(host: string, defaultOptions: OptionsWithoutMethod) {
    this.host = host;
    this.defaultOptions = defaultOptions;
  }

  _genMethod =
    (method: METHOD) =>
    (url: string, options?: OptionsWithoutMethod): Promise<XMLHttpRequest> => {
      return this.request(this.host + url, { ...options, ...this.defaultOptions, method }, options?.timeout ?? 0);
    };

  get = this._genMethod(METHOD.GET);
  put = this._genMethod(METHOD.PUT);
  post = this._genMethod(METHOD.POST);
  delete = this._genMethod(METHOD.DELETE);

  request = (url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const { data, headers, method } = options;

      if (method.toLowerCase() === "get" && options.data != null) {
        url += this.queryStringify(options.data as Record<string, unknown>);
      }

      xhr.open(method, url);

      if (options?.withCredentials != null) xhr.withCredentials = true;

      // set headers
      if (headers != null) {
        Object.entries(headers).forEach(([header, value]) => {
          xhr.setRequestHeader(header, value);
        });
      }

      if (data != null) {
        xhr.send(data);
      } else {
        xhr.send();
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          resolve(xhr);
        }
      };
      // xhr.onload = resolve(xhr.re);
      xhr.timeout = options.timeout ?? timeout;
      xhr.ontimeout = reject;
      xhr.onabort = reject;
      xhr.onerror = reject;
    });
  };

  requestWithRetry = (url: string, options: Options, retries = 5): unknown | never => {
    if (options?.retries != null) {
      retries = options.retries;
    }

    const retrier = (response: unknown | string): unknown | never => {
      if (retries === 0) throw new Error(response as string);
      return this.request(url, options)
        .then(
          res => {
            return res;
          },
          rej => {
            retries = retries - 1;
            throw new Error(rej);
          }
        )
        .catch(retrier);
    };

    return this.request(url, options)
      .then(
        res => {
          return res;
        },
        rej => {
          retries = retries - 1;
          throw new Error(rej);
        }
      )
      .catch(retrier);
  };

  queryStringify = (data: Record<string, unknown>) => {
    if (typeof data !== "object") return undefined;
    return (
      "?" +
      Object.entries(data)
        .map(([key, value]) => `${key}=${value as string}`)
        .join("&")
    );
  };
}
