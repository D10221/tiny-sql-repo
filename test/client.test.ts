import client, { count, exists, find, get, insert, remove, set, update, FetchLike } from "../src/action-handler-client";

const respondWith = (answer: {
    ok: boolean,
    jsonBody: any
}) => {
    const { ok, jsonBody } = answer;
    return {
        ok,
        json: () => Promise.resolve(jsonBody),
    } as Response
}

async function test<P, R>(
    fun: (ftch: (json: string) => Promise<Response>) => (p: P) => Promise<R>,
    p: P,
    response: Response
) {
    try {
        let requestBody: any = null;
        const result = await fun(json => {
            requestBody = JSON.parse(json);
            return Promise.resolve(response)
        })(p);
        return {
            requestBody,
            result
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

describe("tny repo remote client", () => {
    /** */
    it("invoke count", async () => {
        const { requestBody, result } = await test(count, "", respondWith({ ok: true, jsonBody: 1 }))
        expect(requestBody).toMatchObject({ payload: { filter: "", }, type: "count" });
        expect(result).toBe(1);
    })
    it("invoke exists", async () => {
        const { requestBody, result } = await test(exists, "", respondWith({ ok: true, jsonBody: true }))
        expect(requestBody).toMatchObject({ payload: { filter: "", }, type: "exists" });
        expect(result).toBe(true);
    })
    it("invoke find", async () => {
        const { requestBody, result } = await test(find, { filter: "", columns: [] as any, take: 1, skip: 1, desc: true }, respondWith({ ok: true, jsonBody: [] }))
        expect(requestBody).toMatchObject({ payload: { filter: "", columns: [] as any, take: 1, skip: 1, desc: true }, type: "find" });
        expect(result).toMatchObject([]);
    })
    it("invoke get", async () => {
        const { requestBody, result } = await test(get, { columns: [] as any, id: 1 }, respondWith({ ok: true, jsonBody: { id: 1 } }))
        expect(requestBody).toMatchObject({ payload: { columns: [] as any, id: 1 }, type: "get" });
        expect(result).toMatchObject({ id: 1 });
    })
    it("invoke insert", async () => {
        const { requestBody, result } = await test(insert, { id: 1 }, respondWith({ ok: true, jsonBody: { id: 1 } }));
        expect(requestBody).toMatchObject({ payload: { id: 1 }, type: "insert" });
        expect(result).toMatchObject({ id: 1 });
    })
    it("invoke remove", async () => {
        const { requestBody, result } = await test(remove, { id: "x" as any } as any, respondWith({ ok: true, jsonBody: "ok" }));
        expect({ requestBody, result }).toMatchObject({
            requestBody: {
                payload: { id: "x" },
                type: "remove"
            },
            result: "ok"
        })
    })
    it("set", async () => {
        const { requestBody, result } = await test(set, { id: 1 }, respondWith({ ok: true, jsonBody: "ok" }));
        expect({ requestBody, result }).toMatchObject({
            requestBody,
            result
        })

    })
    const fetchMock = (ok: boolean, answer: (url?: RequestInfo, request?: RequestInit) => any): FetchLike =>
        (url: RequestInfo, request?: RequestInit) => {
            return Promise.resolve({
                ok,
                json() {
                    try {
                        return Promise.resolve(answer(url, request));
                    } catch (error) {
                        return Promise.reject(error);
                    }
                }
            } as Response)
        };
    it("Builds client", () => {
        (global as any).fetch = fetchMock(false, () => { throw new Error("It Fetch Should not be invoked") });
        const { count, exists, find, get, insert, invoke, remove, set, update } = client("/", {});
        expect(count).toBeInstanceOf(Function);
        expect(exists).toBeInstanceOf(Function);
        expect(find).toBeInstanceOf(Function);
        expect(get).toBeInstanceOf(Function);
        expect(insert).toBeInstanceOf(Function);
        expect(invoke).toBeInstanceOf(Function);
        expect(remove).toBeInstanceOf(Function);
        expect(set).toBeInstanceOf(Function);
        expect(update).toBeInstanceOf(Function);
    });
})