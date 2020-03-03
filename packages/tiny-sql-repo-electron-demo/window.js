function onError(error) {
  console.log("%s", error && error.name ? error.name : "Error");
  console.error(error);
}

const { invoker } = require("../tiny-sql-repo-electron/dist/cjs/client");

async function main() {
  try {
    const table = invoker({
      name: "tiny-sql-repo-electron-table-one",
      pkey: "id",
      pkeyAuto: true,
    })("no-db-name-required");
    window.table = table;
    let x = await table.find({
      filter: "id>10",
      searchText: "a",
      columns: ["id", "value", "value2"],
      searchColumns: ["value2"],
      skip: 1,
      take: 1,
      orderByDesc: false,
    });
    console.log(x);
    x = await table.update({
      id: 1,
      value: "1",
    });
    console.log(x);
    x = await table.update({
      id: 1,
      value: undefined,
    });
    console.log(x);
  } catch (error) {
    onError(error);
  }
}
main();