import curry from "./curry";
import pipe from "./pipe";
import { RepoActionType } from "./repo";

const toJson = curry(<A, P>(actionType: A, payload: P) => {
  return JSON.stringify({ type: actionType, payload });
});

const toRequest = (
  requestBase: RequestInit | undefined,
  body: string,
): RequestInit => {
  requestBase = requestBase || {};
  return {
    ...requestBase,
    method: requestBase.method || "POST",
    body,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...requestBase.headers,
    },
  };
};
const fromJson = curry(
  async <R>(f: (x: any) => R, p: Promise<Response>): Promise<R> => {
    try {
      const res = await p;
      if (!res.ok) {
        throw new Error(`${res.statusText} (${res.status})`);
      }
      return res.json().then(data => {
        if (data.error) return Promise.reject(new Error(data.error));
        else return f(data);
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

const toArray = <T>() => (x: any) => {
  if (Array.isArray(x)) return x as T[];
  throw new Error("Not Arrays");
};

const toObject = <T>() => (x: any) => {
  if (typeof x === "object") return x as T;
  throw new Error("Expected {}");
};

const asAny = (x: any) => x;

export const count = (ftch: (jsonBody: string) => Promise<Response>) => {
  return pipe(
    (filter: string) => ({ filter }),
    toJson<RepoActionType, { filter: string }>("count"),
    ftch,
    fromJson(Number),
  );
};
export const exists = (ftch: (jsonBody: string) => Promise<Response>) => {
  return pipe(
    (filter: string) => ({ filter }),
    toJson<RepoActionType, { filter: string }>("exists"),
    ftch,
    fromJson(Boolean),
  );
};
export const find = <T extends {}, K extends keyof T & string>(
  ftch: (jsonBody: string) => Promise<Response>,
) => {
  return pipe(
    toJson<
      RepoActionType,
      {
        filter: string;
        params?: {};
        columns?: K[];
        take?: number;
        skip?: number;
        desc?: boolean;
      }
    >("find"),
    ftch,
    fromJson(toArray<T>()),
  );
};
export const get = <T, K extends keyof T & string>(
  ftch: (jsonBody: string) => Promise<Response>,
) => {
  return pipe(
    toJson<RepoActionType, { id: (T[K] & string) | number; columns?: K[] }>(
      "get",
    ),
    ftch,
    fromJson(toObject<T>()),
  );
};
export const insert = <T>(ftch: (jsonBody: string) => Promise<Response>) => {
  return pipe(toJson<RepoActionType, T>("insert"), ftch, fromJson(asAny));
};
export const update = <T>(ftch: (jsonBody: string) => Promise<Response>) => {
  return pipe(
    toJson<RepoActionType, Partial<T>>("update"),
    ftch,
    fromJson(asAny),
  );
};
export const set = <T>(ftch: (jsonBody: string) => Promise<Response>) => {
  return pipe(toJson<RepoActionType, T>("set"), ftch, fromJson(asAny));
};
export const remove = <T, K extends keyof T & string>(
  ftch: (jsonBody: string) => Promise<Response>,
) => {
  return pipe(
    toJson<RepoActionType, { id: T[K] & (string | number) }>("remove"),
    ftch,
    fromJson(asAny),
  );
};
export type FetchLike = (
  input: RequestInfo,
  init?: RequestInit,
) => Promise<Response>;
export type Send = (json: string) => Promise<Response>;

const globalFetch = (): FetchLike | undefined =>
  typeof global !== "undefined"
    ? (global as any).fetch
    : typeof window !== "undefined"
    ? window.fetch
    : undefined;

/** */
export const mkSend = (
  input: RequestInfo,
  requestBase: RequestInit = {},
  fetch: FetchLike | undefined = globalFetch(),
): Send => {
  if (!fetch) {
    throw new TypeError("Missing Fetch (window|global|user-defined)");
  }
  return (json: string) => fetch(input, toRequest(requestBase, json));
};
/** */
const clientFty = <T, K extends keyof T & string>(
  url: RequestInfo,
  requestBase?: RequestInit,
  fetch?: FetchLike,
) => {
  const send = mkSend(url, requestBase, fetch);
  return {
    invoke: (RepoActionType: string, payload: {}) =>
      pipe(toJson<string, any>(RepoActionType), send, fromJson(asAny))(payload),
    count: count(send),
    exists: exists(send),
    find: find<T, K>(send),
    get: get<T, K>(send),
    remove: remove<T, K>(send),
    insert: insert<T>(send),
    set: set<T>(send),
    update: update<T>(send),
  };
};

export default clientFty;
