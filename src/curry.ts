type Curry =
    & (<a, b, c>(f: (a: a, b: b) => c) => (a: a) => (b: b) => c)
    & (<a, b, c, d>(f: (a: a, b: b, c: c) => d) => (a: a) => (b: b) => (c: c) => d)
    & (<a, b, c, d, e>(f: (a: a, b: b, c: c, d: d) => e) => (a: a) => (b: b) => (c: c) => (d: d) => e);
export class ArityError extends Error {
    constructor(message: string){
        super(message);
    }
}
const curry: Curry = (fn: (...xargs: any[]) => any) => {
    const arity = fn.length;
    if (arity < 2) throw new ArityError("Can't curry arity < 2");
    const rec = (...args: any[]): any => {
        if (args.length < arity) {
            return (x: any) => rec(...args, x);
        }
        return fn(...args);
    };
    return rec;
};

export default curry;