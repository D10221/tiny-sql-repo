import { invoke } from "./invoke";
import { ExecFindOptions } from "@d10221/tiny-sql-repo";
import { rejectNullOrUndefined } from "./rejectNullOrUndefined";

export type Invoker<T, K extends keyof T & string> = {
  pkey: K;
  get: (id: T[K], keys?: (keyof T)[]) => Promise<T>;
  set: (data: T) => Promise<any>;
  find: (payload: ExecFindOptions<T>) => Promise<T[]>;
  update: (data: Partial<T> & { [key in K]: T[K] }) => Promise<any>;
  insert: (data: T) => Promise<any>;
  remove: (id: T[K]) => Promise<any>;
  count: (filter?: string | undefined) => Promise<number>;
  exists: (filter?: string | undefined) => Promise<boolean>;
};
export type InvokerConfig<T, K extends keyof T & string> = {
  name: string;
  pkey: K;
  pkeyAuto?: boolean;
};
export const invoker = <T, K extends keyof T & string>(
  config: InvokerConfig<T, K>,
) => (dbName: string): Invoker<T, K> => {
  const { name, pkey, pkeyAuto } = config;
  return {
    pkey,
    get: (id, columns) =>
      invoke({
        type: "get",
        payload: { id, columns },
        meta: { use: dbName, from: name, pkey, pkeyAuto },
      }),
    set: (payload: T) =>
      invoke({
        type: "set",
        payload: rejectNullOrUndefined(payload),
        meta: { use: dbName, from: name, pkey, pkeyAuto },
      }),
    find: payload =>
      invoke({
        type: "find",
        payload,
        meta: { use: dbName, from: name, pkey, pkeyAuto },
      }),
    update: (payload: Partial<T> & { [key in K]: T[K] }) =>
      invoke({
        type: "update",
        payload: rejectNullOrUndefined(payload),
        meta: { use: dbName, from: name, pkey, pkeyAuto },
      }),
    insert: (payload: T) =>
      invoke({
        type: "insert",
        payload: rejectNullOrUndefined(payload),
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
