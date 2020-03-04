import { invoker } from "@d10221/tiny-sql-repo-electron/dist/client";

function onError(error: any) {
  console.log("%s", error && error.name ? error.name : "Error");
  console.error(error);
}

async function main() {
  try {
    const table = invoker<any,any>({
      name: "tiny-sql-repo-electron-table-one",
      pkey: "id",
      pkeyAuto: true,
    })("no-db-name-required");
    (window as any).table = table;
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