import { repo } from "../src";
import { execSql, connect } from "@d10221/tiny-sql";
import { Connection } from "tedious";
import { randomBytes } from "crypto";

const randomString = (length = 16, enc = "hex") =>  randomBytes(length).toString(enc);

type TestTable = {
  id: number;
  value: string;
};
type Kv = {
  key: string;
  value: string;
};
function* range(from: number, to: number) {
  while (from <= to) {
    yield from++;
  }
}
function rangeFrom(from: number, to: number) {
  return Array.from(range(from, to));
}
describe("tiny-repo", () => {
  let connection: Connection;
  beforeAll(async () => {
    const {
      SQL_SERVER_DATABASE,
      SQL_SERVER_DATA_SOURCE,
      SQL_SERVER_PASSWORD,
      SQL_SERVER_USER,
    } = process.env;
    connection = await connect({
      server: SQL_SERVER_DATA_SOURCE,
      options: {
        database: SQL_SERVER_DATABASE,
      },
      authentication: {
        type: "default",
        options: {
          userName: SQL_SERVER_USER,
          password: SQL_SERVER_PASSWORD,
        },
      },
    });
    await execSql(`
    IF(exists(select * from sys.tables where [name] = 'KV'))
        DROP TABLE KV;
    CREATE TABLE KV([key] VARCHAR(32) NOT NULL UNIQUE, [value] varchar(max) NOT NULL)
    `)(connection);

    await execSql(`
    IF(exists(select * from sys.tables where [name] = 'testtable'))
        DROP TABLE testtable;
    CREATE TABLE testtable(id int not null identity(1,1), value varchar(max))
    `)(connection);

    for (const i of rangeFrom(1, 100)) {
      await execSql(`
        INSERT INTO testtable (value) VALUES ('index-${i}')
        `)(connection);
    }
  });
  afterAll(() => {
    connection.close();
  });

  const { find, get, insert, remove, set, update, count, exists } = repo<
    TestTable,
    "id"
  >({
    tableName: "testtable",
    pkey: "id",
    pkeyAuto: true,
  });

  const kv = repo<Kv, "key">({ pkey: "key", tableName: "KV" });

  it("get nothing", async () => {
    const value = await get(101)(connection);
    expect(value).toBe(undefined);
  });
  it("get", async () => {
    const value = await get(1)(connection);
    expect(value).toMatchObject({ id: 1, value: "index-1" });
  });
  it("get select keys", async () => {
    const value = await get(1, ["value"])(connection);
    expect(value).toMatchObject({ value: "index-1" });
  });
  it("finds all", async () => {
    const values = await find("1=1")(connection);
    expect(values.length).toBe(100);
  });
  it("finds some", async () => {
    const values = await find("id in (1,2,3)")(connection);
    expect(values.length).toBe(3);
  });
  it("finds nothing", async () => {
    const { values } = await find("id > 100")(connection);
    expect(values.length).toBe(0);
  });
  it("finds selects keys", async () => {
    let params: any = undefined;
    const values = await find("id = 100", params, ["value"])(connection);
    expect(values[0]).toMatchObject({ value: "index-100" });
  });
  it("finds limit 1", async () => {
    let params: any = undefined;
    const keys: any[] = []; // select *
    const values = await find("1=1", params, keys, 1)(connection);
    expect(values.length).toBe(1);
  });
  it("finds over limit", async () => {
    const limit = 1000;
    let params: any = undefined;
    const keys: any[] = []; // select *
    const values = await find("1=1", params, keys, limit)(connection);
    expect(values.length).toBe(100);
  });
  it("finds ordering by desc", async () => {
    const limit = 1000;
    let params: any = undefined;
    const keys: any[] = ["id"]; // select *
    const all = "1=1"; // Not filter
    const desc = true;
    const skip = 0;
    const values = await find(all, params, keys, limit, skip, desc)(connection);
    expect(values[0]).toMatchObject({ id: 100 });
  });
  it("finds ordering by asc", async () => {
    const limit = 1000;
    let params: any = undefined;
    const keys: any[] = ["id"]; // select *
    const all = "1=1"; // Not filter
    const desc = false;
    const skip = 0;
    const values = await find(all, params, keys, limit, skip, desc)(connection);
    expect(values[0]).toMatchObject({ id: 1 });
  });
  it("finds [11...20]", async () => {
    const values = await find(
      "1=1", // filter
      undefined, // params
      [], //
      10,
      10,
      false,
    )(connection);
    expect(values.map(x => x.id)).toMatchObject(rangeFrom(11, 20));
  });
  it("finds [90...81]", async () => {
    // take 10 skip 10 order by desc
    const values = await find("1=1", undefined, [], 10, 10, true)(connection);
    expect(values.map(x => x.id)).toMatchObject(rangeFrom(81, 90).reverse());
  });
  it("updates", async () => {
    await update({ id: 1, value: "x-1" })(connection);
    const values = await find(" id=1")(connection);
    expect(values.length).toBe(1);
    expect(values[0]).toMatchObject({ id: 1, value: "x-1" });
  });
  it("updates (nothing)", async () => {
    const { rowCount } = await update({ id: 1000, value: "x-1000" })(
      connection,
    );
    expect(rowCount).toBe(0);
  });
  it("counts", async () => {
    const n = await count("id > 0 AND id < 101")(connection);
    expect(n).toBe(100);
    expect(await count()(connection)).toBe(100);
  });
  it("inserts", async () => {
    const n = await count()(connection);
    const { rowCount, values } = await insert({ id: 0, value: "x-101" })(
      connection,
    );
    expect(rowCount).toBe(2); // because of @@identity
    expect(values[0].id).toBe(n + 1);
    expect(await count()(connection)).toBe(n + 1);
  });
  it("inserts ignores id when auto", async () => {
    const n = await count()(connection);
    const { rowCount, values } = await insert({
      id: 1000, //ignored
      value: `x-${n + 1}`,
    })(connection);
    expect(rowCount).toBe(2); // because of @@identity
    expect(values[0].id).toBe(n + 1);
    expect(await count()(connection)).toBe(n + 1);
  });
  it("remove (nothing)", async () => {
    const { rowCount } = await kv.remove("")(connection);
    expect(rowCount).toBe(0);
  });
  it("remove (1)", async () => {
    const key = randomString();
    const { values } = await kv.insert({ key, value: key })(connection);
    expect(values[0].key).toBe(key);
    const { rowCount } = await kv.remove(key)(connection);
    expect(rowCount).toBe(1);
  });
  it("remove (auto)", async () => {
    const randomtable = "table_" + randomString(4);
    await execSql(`
    if(exists(select [name] from sys.tables where [name] = '${randomtable}'))
      drop table [${randomtable}];    
    create table [${randomtable}] ([id] INT NOT NULL IDENTITY(1,1));
    `)(connection);
    await execSql(`    
    SET IDENTITY_INSERT [${randomtable}] ON;
    INSERT [${randomtable}] ([id]) VALUES (1111);
    SET IDENTITY_INSERT [${randomtable}] OFF;
    `)(connection);
    type RandomTable = {
      id: number;
    };
    const randomRepo = repo<RandomTable, "id">({
      pkey: "id",
      tableName: randomtable,
      pkeyAuto: true,
    });
    expect((await randomRepo.get(1111)(connection)).id).toBe(1111);
    const result = await randomRepo.remove(1111)(connection);
    expect(result.rowCount).toBe(1);
    expect(await randomRepo.get(1111)(connection)).toBe(undefined);
  });
  it("exists none", async () => {
    const e = await kv.exists()(connection);
    expect(e).toBe(false);
  });
  it("execs exists any", async () => {
    const e = await exists()(connection);
    expect(e).toBe(true);
  });
  it("execs exists where", async () => {
    const e = await exists("id=1")(connection);
    expect(e).toBe(true);
  });
  it("execs not exists where", async () => {
    const e = await exists("id=1000")(connection);
    expect(e).toBe(false);
  });
  it("sets (auto) (inserts)", async () => {
    const c = await count()(connection);
    const data = {
      id: 0, // ignored
      value: c.toString(),
    };
    const { values } = await set(data)(connection);
    expect(values[0].id).toBe(c + 1);
  });
  it("sets (key) (inserts)", async () => {
    const key = randomString();
    const data = {
      key, // ignored
      value: key,
    };
    const { values } = await kv.set(data)(connection);
    expect(values[0].key).toBe(key);
  });
});
