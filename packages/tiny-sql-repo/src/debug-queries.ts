const debugEnabled = typeof process.env.DEBUG === "string" && /tiny-sql-repo\/queries/.test(process.env.DEBUG);
/**
 *  
 */
export function debugQueries<T extends {
  [k in keyof T]: Function;
}>(x: T): T {
  if (!debugEnabled)
    return x;
  return (Object.keys(x) as (keyof T)[]).reduce((out, next) => {
    out[next] = (...args: any[]) => {
      const r = x[next](...args);
      console.log("%s: \n%s", next, r);
      return r;
    };
    return out;
  }, {} as any);
}
