import pipe from "./pipe";
import { execSql, Result } from "@d10221/tiny-sql";
import queries, { FindOptions, OrderByOptions, PagedOptions } from "./queries";
import { Connection } from "tedious";

const then = <X, R>(f: (x: X) => R) => (p: Promise<X>) => p.then(f);
const values = <X>(r: Result<X>) => r.values;
const first = <X>(values: X[]) => values[0];
const firstValue = <T, R>(f: (x: T) => R) => (x: any) => f(x[0]);

export type Repo<T, K extends keyof T & string> = {
  pkey: K;
  get: (id: T[K], keys?: (keyof T)[]) => (v: Connection) => Promise<T>;
  set: (
    data: T,
  ) => (connection: Connection) => Promise<Result<{ [key in K]: T[K] }>>;
  find: (
    filter: string,
    params?: {} | undefined,
    columns?: (keyof T)[],
    take?: number,
    skip?: number,
    desc?: boolean,
  ) => (v: Connection) => Promise<T[]>;
  update: (
    data: Partial<T> & { [key in K]: T[K] },
  ) => (connection: Connection) => Promise<Result<T>>;
  insert: (
    data: T,
  ) => (connection: Connection) => Promise<Result<{ [key in K]: T[K] }>>;
  remove: (id: T[K]) => (connection: Connection) => Promise<Result<any>>;
  count: (filter?: string | undefined) => (v: Connection) => Promise<number>;
  exists: (filter?: string | undefined) => (v: Connection) => Promise<boolean>;
};

export type RepoActionType = keyof Repo<any, any>;

export type RepoFty<T, K extends keyof T & string> = (options: {
  tableName: string;
  pkey: K;
  pkeyAuto?: boolean | undefined;
}) => Repo<T, K>;
/** new */
export type ExecFindOptions<T> = FindOptions<T> &
  OrderByOptions<T> &
  PagedOptions & {
    params?: {};
  };
/** */
export const tinyRepo = <T, K extends keyof T & string>(options: {
  tableName: string;
  pkey: K;
  pkeyAuto?: boolean;
}) => {
  const { pkey } = options;
  type Key = keyof T & string;
  type Identity = { [key in K]: T[K] };
  const {
    get,
    set,
    find,
    update,
    insert,
    remove,
    paged,
    count,
    exists,
  } = queries<T, K>(options);

  const execGet = (id: T[K], keys: Key[] = []) =>
    pipe(
      execSql<T>(get(keys), { id }),
      then(values),
      then(first),
    );

  const execSet = (data: T) =>
    execSql<Identity>(set(data), { ...data, id: data[pkey] });

  const execFind = (execFindOptions: ExecFindOptions<T>) => {
    const {
      filter,
      columns,
      searchText,
      searchColumns,
      take,
      skip,
      orderBy,
      orderByDesc,
      params,
    } = execFindOptions;
    return pipe(
      execSql<T>(
        paged(find({ filter, columns, searchText, searchColumns }), {
          take,
          skip,
          orderBy,
          orderByDesc,
        }),
        params,
      ),
      then(values),
    );
  };

  const execUpdate = (data: Partial<T> & Identity) =>
    execSql<T>(update(data), { ...data, id: data[pkey] });

  const execInsert = (data: T) => execSql<Identity>(insert(data), data);

  const execRemove = (id: T[K]) => execSql<any>(remove(), { id });

  const execCount = (filter?: string) =>
    pipe(
      execSql<{}>(count(filter)),
      then(values),
      then(first),
      then(firstValue(Number)),
    );

  const execExists = (filter?: string) =>
    pipe(
      execSql<any>(exists(filter)),
      then(values),
      then(first),
      then(firstValue(Boolean)),
    );

  return {
    pkey,
    get: execGet,
    set: execSet,
    find: execFind,
    update: execUpdate,
    insert: execInsert,
    remove: execRemove,
    count: execCount,
    exists: execExists,
  };
};
