

type F<a, b> = (a: a) => b;
type Pipe =
    & (<a, b, c>(a: F<a, b>, b: F<b, c>) => (v: a) => c)
    & (<a, b, c, d>(a: F<a, b>, b: F<b, c>, c: F<c, d>) => (v: a) => d)
    & (<a, b, c, d, e>(a: F<a, b>, b: F<b, c>, c: F<c, d>, e: F<d, e>) => (v: a) => e)
    & (<a, b, c, d, e, f>(a: F<a, b>, b: F<b, c>, c: F<c, d>, e: F<d, e>, f: F<e,f>) => (v: a) => f);

const pipe: Pipe = (...fns: F<any, any>[]) =>
    (value: any) => fns.reduce((acc: any, fn: F<any, any>) => fn(acc), value);

export default pipe;