import { execSql } from "@d10221/tiny-sql";
import { rangeFrom } from "./util";
import { Connection } from "tedious";

export const create = (tableName: string) =>
  execSql(`
IF(exists(select * from sys.tables where [name] = '${tableName}'))
    DROP TABLE [${tableName}];
CREATE TABLE [${tableName}](id int not null identity(1,1), value varchar(max), value2 varchar(max))
`);
export const fill = (tableName: string) => async (connection: Connection) => {
  for (const i of rangeFrom(1, 100)) {
    // reverse
    const x = (100 - i).toString(16);
    const query = `
IF(NOT(EXISTS(SELECT [id] FROM [${tableName}] where [value] ='index-${i}' )))
INSERT INTO [${tableName}] (value, value2) VALUES ('index-${i}', '${x}')
`;
    try {
      await execSql(query)(connection);
    } catch (error) {
      console.log(query);
      console.error(error);
      throw error;
    }
  }
};
export const drop = (tableName: string) =>
  execSql(`
IF(exists(select * from sys.tables where [name] = '${tableName}'))
    DROP TABLE [${tableName}];        
`);
