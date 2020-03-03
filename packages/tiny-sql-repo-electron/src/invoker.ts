import { Invoker } from "./types";
import { invoke } from "./invoke";
export const invoker = <T, K extends keyof T & string>(
  name: string,
  pkey: K,
  pkeyAuto = false,
) => (dbName: string): Invoker<T, K> => {
  return {
    get: (id, columns) =>
      invoke({
        type: "get",
        payload: { id, columns },
        meta: { use: dbName, from: name, pkey, pkeyAuto },
      }),
    set: (payload: T) =>
      invoke({
        type: "set",
        payload,
        meta: { use: dbName, from: name, pkey, pkeyAuto },
      }),
    find: (payload: {
      filter: string;
      params?: {} | undefined;
      columns?: (keyof T)[];
      take?: number;
      skip?: number;
      desc?: boolean;
    }) =>
      invoke({
        type: "find",
        payload,
        meta: { use: dbName, from: name, pkey, pkeyAuto },
      }),
    update: (payload: Partial<T> & { [key in K]: T[K] }) =>
      invoke({
        type: "update",
        payload,
        meta: { use: dbName, from: name, pkey, pkeyAuto },
      }),
    insert: (payload: T) =>
      invoke({
        type: "insert",
        payload,
        meta: { use: dbName, from: name, pkey, pkeyAuto },
      }),
    remove: (id: T[K]) =>
      invoke({
        type: "find",
        payload: { id },
        meta: { use: dbName, from: name, pkey, pkeyAuto },
      }),
    count: (filter?: string | undefined) =>
      invoke({
        type: "count",
        payload: filter,
        meta: { use: dbName, from: name, pkey, pkeyAuto },
      }),
    exists: (filter?: string | undefined) =>
      invoke({
        type: "exists",
        payload: { filter },
        meta: { use: dbName, from: name, pkey, pkeyAuto },
      }),
  };
};
