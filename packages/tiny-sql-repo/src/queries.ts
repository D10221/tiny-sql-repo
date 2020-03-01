function $keys<X>(x: X) {
  return Object.keys(x) as (keyof X)[];
}

const queries = <T, K extends keyof T & string>(options: {
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

  const select = (...cols: Key[]) =>
    `SELECT ${selectKeys(cols)} FROM [${tableName}]`;

  const get = (columns: Key[]) =>
    `${select(...columns)}  ${where(`[${pkey}] = @id`)}`;

  const where = (filter?: string) => {
    switch (typeof filter) {
      case "string":
        return `WHERE ${filter}`;
      default:
        return "";
    }
  };
  const find = (filter: string, columns: Key[]) =>
    `${select(...columns)} ${where(filter)}`;

  const set = (data: T) =>
    `IF(EXISTS(${select(pkey)} WHERE [${pkey}]=@id)) ` +
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

  const offset = (skip: number) => `OFFSET ${skip} ROWS`;

  const limit = (take: number) =>
    take > 0 ? `FETCH NEXT ${take} ROWS ONLY` : "";

  const orderby = (desc = true) =>
    `ORDER BY [${pkey}] ${desc ? "desc" : "asc"}`;

  const paged = (q: string, take = 0, skip = 0, desc = true) =>
    `${q} ${orderby(desc)} ${offset(skip)} ${limit(take)};`;

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

  return {
    get,
    set,
    update,
    insert,
    find,
    remove,
    paged,
    count,
    exists,
  };
};

export default queries;
