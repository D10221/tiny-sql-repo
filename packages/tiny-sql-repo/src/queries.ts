import { debugQueries } from "./debug-queries";

export type FindOptions<T> = {
  filter: string,
  columns?: (keyof T & string)[],
  searchText?: string,
  searchColumns?: (keyof T & string)[]
}
export type OrderByOptions<T> = {
  orderBy?: keyof T,
  orderByDesc?: boolean,
}
export type PagedOptions = {
  take?: number;
  skip?: number;
}
function $keys<X>(x: X) {
  return Object.keys(x) as (keyof X)[];
}

export const queries = <T, K extends keyof T & string>(options: {
  tableName: string;
  pkey: K;
  pkeyAuto?: boolean;
}) => {
  type Key = keyof T;

  const { tableName, pkey, pkeyAuto } = options;

  function isNotKey(key: keyof T) {
    return !pkeyAuto || key !== pkey;
  }

  function updateKeys(data: T | Partial<T>) {
    return $keys(data)
      .filter(isNotKey)
      .map(xKey => `[${xKey}]=@${xKey}`)
      .join(",\r");
  }

  function columns(data: T) {
    return $keys(data)
      .filter(isNotKey)
      .map(quote("[", "]"))
      .join(", ");
  }

  function params(data: T) {
    return $keys(data)
      .filter(isNotKey)
      .map(x => `@${x}`)
      .join(", ");
  }

  const selectKeys = (cols: Key[]) =>
    cols && cols.length ? cols.map(quote("[", "]")).join(", ") : "*";

  const from = (tableName: string, select: string) => `${select} FROM [${tableName}]`;

  const select = (...cols: Key[]) =>
    `SELECT ${selectKeys(cols)} `;

  const get = (columns: Key[]) =>
    `${from(tableName, select(...columns))} ${where(`[${pkey}] = @id`)}`;

  const where = (filter?: string) => {
    switch (typeof filter) {
      case "string":
        return `WHERE ${filter}`;
      default:
        return "";
    }
  };
  const search = (searchColumns: (keyof T & string)[], searchText?: string | undefined) => {
    return (searchColumns.map(c => `[${c}] LIKE '%${searchText || ""}%'`)
      .join(" OR "));
  }
  const applySearch = (o: FindOptions<T>) => {
    const { filter, columns, searchText, searchColumns } = o;
    if (!searchText) return filter;
    return [filter, search(searchColumns || columns || [], searchText)].join(" AND ")
  }
  const find = (findOptions: FindOptions<T>) => {
    const { columns } = findOptions;
    return `${from(tableName, select(...(columns || [])))} ${where(applySearch(findOptions))}`;
  }
  const set = (data: T) =>
    `IF(EXISTS(${from(tableName, select(pkey))} WHERE [${pkey}]=@id)) ` +
    `${update(data)}` +
    ` ELSE ` +
    `INSERT INTO [${tableName}] (${columns(data)}) VALUES (${params(data)});` +
    `${identity(data)}`;

  const update = (data: Partial<T>) => {
    return `UPDATE [${tableName}]
        SET ${updateKeys(data)}
        WHERE [${pkey}] = @id`;
  };

  const quote = (...quotes: string[]) => (x: any) => {
    const [begin, end] = quotes;
    switch (typeof x) {
      case "number":
        return x.toString();
      case "string":
        return `${begin || "'"}${x}${end || "'"}`;
      default: {
        throw new Error(`Expected string|number instead of ${typeof x}`);
      }
    }
  };

  const identity = (data: T) =>
    pkeyAuto
      ? `SELECT @@IDENTITY as [${pkey}]`
      : `SELECT ${quote()(data[pkey])} as [${pkey}]`;

  const insert = (data: T) => `
    INSERT INTO [${tableName}]  
    (${columns(data)}) 
    VALUES (${params(data)});
    ${identity(data)}`;

  const remove = (filter?: string) =>
    `DELETE [${tableName}] ${optional(where, `WHERE [${pkey}] = @id`)(filter)}`;

  const offset = (skip?: number | undefined) => `OFFSET ${skip || 0} ROWS`;

  const limit = (take?: number) =>
    (take && take > 0) ? `FETCH NEXT ${take} ROWS ONLY` : "";

  const orderby = (orderByOptions: OrderByOptions<T>) => {
    let { orderBy, orderByDesc } = orderByOptions;
    orderByDesc = typeof orderByDesc === "boolean" ? orderByDesc : true;
    return `ORDER BY [${orderBy || pkey}] ${orderByDesc ? "desc" : "asc"}`;
  }

  const paged = (q: string, o: PagedOptions & OrderByOptions<T>) => {
    let { skip, take, orderByDesc, orderBy } = o
    return `${q} ${orderby({ orderByDesc, orderBy })} ${offset(skip)} ${limit(take)};`;
  }

  const optional = <P, R>(f: (p: P) => R, def?: R) => (p: P) =>
    (p && f(p)) || def;

  const count = (
    filter?: string, //
  ) =>
    `SELECT count([${pkey}]) FROM [${tableName}] ` +
    `${optional(where, "")(filter)}`;

  const exists = (filter?: string) =>
    `SELECT CASE WHEN exists` +
    `( SELECT [${pkey}] FROM [${tableName}] ${optional(where, "")(filter)} )` +
    ` THEN 1 ELSE 0 END`;

  return debugQueries({
    get,
    set,
    update,
    insert,
    find,
    remove,
    paged,
    count,
    exists,
  });
};

