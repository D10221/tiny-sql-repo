import { execSql } from "@d10221/tiny-sql";
import { Connection } from "tedious";
import { rangeFrom } from "./util";

export type TempTable = {
    id: number;
    value: string;
    value2: string;
};

export const create = (tableName: string) => execSql<any>(`
IF(exists(select * from sys.tables where [name] = '${tableName}'))
    DROP TABLE ${tableName};
CREATE TABLE ${tableName}(id int not null identity(1,1), value varchar(max), value2 varchar(max))
`);
export const fill = async (connection: Connection, tableName: string) => {
    for (const i of rangeFrom(1, 100)) {
        // reverse 
        const x = (100 - i).toString(16);
        await execSql(
            `
INSERT INTO ${tableName} (value, value2) VALUES ('index-${i}', '${x}')
`)(connection);
    }
}
export const drop = (tableName: string) => execSql(`
IF(exists(select * from sys.tables where [name] = '${tableName}'))
    DROP TABLE ${tableName};        
`);