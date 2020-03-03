import { randomBytes } from "crypto";

export const randomString = (length = 16, enc = "hex") =>
  randomBytes(length).toString(enc);

export function* range(from: number, to: number) {
  while (from <= to) {
    yield from++;
  }
}

export function rangeFrom(from: number, to: number) {
  return Array.from(range(from, to));
}
