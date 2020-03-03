const { invoker } = require("../tiny-sql-repo-electron/dist/cjs/client");
const table = invoker({
    name: "tiny-sql-repo-electron-table-one", 
    pkey: "id",
    pkeyAuto: true
})("no-db-name-required");
table.find({
    filter: "id>10",
    searchText: "a",
    columns: ["id", "value", "value2"],
    searchColumns: ["value2"],
    skip: 1,
    take: 1,
    orderByDesc: false
}).then(values => {
    console.log(values);
})