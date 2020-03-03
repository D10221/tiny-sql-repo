export class NUllOrUndefinedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NUllOrUndefinedError"
  }
}
function isNulOrUndefined(x: any): x is null | undefined {
  return typeof x === "undefined" || x === null;
}
export function rejectNullOrUndefined<T>(x: T): T {
  if (isNulOrUndefined(x)) {
    throw new NUllOrUndefinedError("value can't be null|undefined");
  }
  for (const key of Object.keys(x)) {
    if (isNulOrUndefined((x as any)[key])) {
      throw new NUllOrUndefinedError(
        `property '${key}' of ${(x as any).name || typeof x} '${JSON.stringify(
          x,
        )}'  can't be null|undefined.` +
          `value is not serializable, parameter can't be inferred, try using TediousParameterLike, or don't include null|undefined 'key/value'? `,
      );
    }
  }
  return x;
}
