import { tinyRepo, ExecFindOptions } from "../src";
import { execSql as ExecSql, connect } from "@d10221/tiny-sql";
import { Connection } from "tedious";
import { randomString, rangeFrom } from "./util";

const TABLE_NAME = `TABLE_${randomString(8)}`;

type TestTable = {
    id: number;
    value: string;
    value2: string;
};

let connection: Connection;
const execSql = <T>(txt: string, params?: {} | ({}[])) => ExecSql<T>(txt, params)(connection!);

describe("Find", () => {
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
    IF(exists(select * from sys.tables where [name] = '${TABLE_NAME}'))
        DROP TABLE ${TABLE_NAME};
    CREATE TABLE ${TABLE_NAME}(id int not null identity(1,1), value varchar(max), value2 varchar(max))
    `);

        for (const i of rangeFrom(1, 100)) {
            // reverse 
            const x = (100 - i).toString(16);
            await execSql(`
        INSERT INTO ${TABLE_NAME} (value, value2) VALUES ('index-${i}', '${x}')
        `);
        }
    });
    const drop = () => execSql(`
    IF(exists(select * from sys.tables where [name] = '${TABLE_NAME}'))
        DROP TABLE ${TABLE_NAME};        
    `);
    afterAll(async () => {
        await drop();
        connection.close();

    });
    const _repo = tinyRepo<TestTable, "id">({ tableName: `${TABLE_NAME}`, pkey: "id", pkeyAuto: true, });
    const find = (o: ExecFindOptions<TestTable>) => _repo.find(o)(connection);

    it("finds all", async () => {
        const values = await find({ filter: "1=1" });
        expect(values.length).toBe(100);
    });
    it("finds some", async () => {
        const values = await find({ filter: "id in (1,2,3)" });
        expect(values.length).toBe(3);
    });
    it("finds nothing", async () => {
        const { values } = await find({ filter: "id > 100" });
        expect(values.length).toBe(0);
    });
    it("finds selects keys", async () => {
        let params: any = undefined;
        const values = await find({ filter: "id = 100", params, columns: ["id", "value"] });
        expect(values[0]).toMatchObject({ value: "index-100" });
    });
    it("finds limit 1", async () => {
        let params: any = undefined;
        const keys: any[] = []; // select *
        const values = await find({ filter: "1=1", params, columns: keys, take: 1 });
        expect(values.length).toBe(1);
    });
    it("finds over limit", async () => {
        const limit = 1000;
        let params: any = undefined;
        const keys: any[] = []; // select *
        const values = await find({ filter: "1=1", params, columns: keys, take: limit });
        expect(values.length).toBe(100);
    });
    it("finds ordering by desc", async () => {
        const limit = 1000;
        let params: any = undefined;
        const keys: any[] = ["id"]; // select *
        const all = "1=1"; // Not filter
        const desc = true;
        const skip = 0;
        const values = await find({ filter: all, params, columns: keys, take: limit, skip, orderByDesc: desc });
        expect(values[0]).toMatchObject({ id: 100 });
    });
    it("finds ordering by asc", async () => {
        const limit = 1000;
        let params: any = undefined;
        const keys: any[] = ["id"]; // select *
        const all = "1=1"; // Not filter
        const desc = false;
        const skip = 0;
        const values = await find({ filter: all, params, columns: keys, take: limit, skip, orderByDesc: desc });
        expect(values[0]).toMatchObject({ id: 1 });
    });
    it("finds [11...20]", async () => {
        const values = await find(
            {
                filter: "1=1", // filter
                params: undefined, // params
                columns: [], //
                take: 10,
                skip: 10,
                orderByDesc: false,
            }
        );
        expect(values.map(x => x.id)).toMatchObject(rangeFrom(11, 20));
    });
    it("finds [90...81]", async () => {
        // take 10 skip 10 order by desc
        const values = await find({
            filter: "1=1",
            params: undefined,
            columns: [],
            take: 10,
            skip: 10,
            orderByDesc: true
        });
        expect(values.map(x => x.id)).toMatchObject(rangeFrom(81, 90).reverse());
    });
    it("finds searchText", async () => {
        const values = await find({ filter: "1=1", searchText: "4f", columns: ["id", "value", "value2"] });
        expect(values.length).toBe(1);
        expect(values[0].value2).toBe("4f");
    })
    it("finds searchText+filter", async () => {
        const values = await find({ filter: "id>10", searchText: "a", columns: ["id", "value", "value2"], searchColumns: ["value2"] });
        expect(values.map(x => [x.id, x.value, x.value2])).toMatchObject(
            [
                [90, "index-90", "a"],
                [74, "index-74", "1a"],
                [58, "index-58", "2a"],
                [42, "index-42", "3a"],
                [26, "index-26", "4a"],
            ]);
    })
    it("finds searchText+filter+paged", async () => {
        const values = await find({
            filter: "id>10",
            searchText: "a",
            columns: ["id", "value", "value2"],
            searchColumns: ["value2"],
            skip: 1,
            take: 1,
            orderByDesc: false
        });
        expect(values.map(x => [x.id, x.value, x.value2])).toMatchObject(
            [
                [42, "index-42", "3a"],
            ]);
    })
    it("finds sortBy:'key'", async () => {
        const values = await find({ filter: "1=1", searchText: "a", columns: ["id", "value", "value2"], orderBy: "value2" });
        expect(values.map(x => [x.id, x.value, x.value2])).toMatchObject(
            [
                [90, "index-90", "a"],
                [10, "index-10", "5a"],
                [26, "index-26", "4a"],
                [42, "index-42", "3a"],
                [58, "index-58", "2a"],
                [74, "index-74", "1a"],
            ]);
    })
    it("finds sortBy:'key' 'desc'", async () => {
        const values = await find({
            filter: "1=1",
            searchText: "a",
            columns: ["id", "value", "value2"],
            orderBy: "value2", orderByDesc: false
        });
        expect(values.map(x => [x.id, x.value, x.value2])).toMatchObject(
            [
                [74, "index-74", "1a"],
                [58, "index-58", "2a"],
                [42, "index-42", "3a"],
                [26, "index-26", "4a"],
                [10, "index-10", "5a"],
                [90, "index-90", "a"],
            ]);
    })

});
